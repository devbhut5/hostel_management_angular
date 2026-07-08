import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Fee, FeeData } from '../../service/fee';
import { RoomAllocation, HostelInfo } from '../../../room-allocation/services/room-allocation';

@Component({
  selector: 'app-fee-add-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './fee-add-edit.html',
  styleUrl: './fee-add-edit.scss',
})
export class FeeAddEdit implements OnInit {
  feeForm!: FormGroup;
  isEditMode: boolean = false;
  feeIdParam: string | null = null;
  submitted: boolean = false;

  // Master lists
  hostels: HostelInfo[] = [];
  
  feeTypeList = [
    'Hostel Fee',
    'Security Deposit',
    'Maintenance Fee',
    'Electricity Charge',
    'Other'
  ];

  frequencyList = [
    'One Time',
    'Monthly',
    'Quarterly',
    'Yearly'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private feeService: Fee,
    private allocationService: RoomAllocation
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadHostels();
    this.checkEditMode();
  }

  private initForm() {
    this.feeForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      hostelId: ['', [Validators.required]],
      type: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      frequency: ['', [Validators.required]],
      description: [''],
      status: ['Active', [Validators.required]]
    });
  }

  private loadHostels() {
    this.hostels = this.allocationService.getHostels();
  }

  private checkEditMode() {
    this.feeIdParam = this.route.snapshot.paramMap.get('id');
    if (this.feeIdParam) {
      this.isEditMode = true;
      const feeData = this.feeService.getFeeById(this.feeIdParam);
      if (feeData) {
        this.feeForm.patchValue(feeData);
      } else {
        this.router.navigate(['/fee']);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.feeForm.invalid) {
      this.feeForm.markAllAsTouched();
      return;
    }

    const formValue = this.feeForm.value;
    const hostel = this.hostels.find(h => h.id === formValue.hostelId);

    const feeValue: FeeData = {
      id: formValue.id || this.generateFeeId(),
      name: formValue.name,
      hostelId: formValue.hostelId,
      hostelName: hostel ? hostel.name : 'All Hostels',
      type: formValue.type,
      amount: formValue.amount,
      frequency: formValue.frequency,
      description: formValue.description,
      status: formValue.status
    };

    let success = false;
    if (this.isEditMode) {
      success = this.feeService.updateFee(feeValue);
    } else {
      success = this.feeService.addFee(feeValue);
    }

    if (success) {
      this.router.navigate(['/fee']);
    }
  }

  private generateFeeId(): string {
    const fees = this.feeService.getFees();
    if (fees.length === 0) return 'FEE-001';
    const ids = fees.map(f => {
      const match = f.id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const nextNum = Math.max(...ids) + 1;
    return `FEE-${nextNum.toString().padStart(3, '0')}`;
  }
}

