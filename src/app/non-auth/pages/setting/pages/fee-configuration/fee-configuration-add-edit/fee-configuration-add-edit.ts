import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HostelInfo, RoomAllocation } from '../../../../room-allocation/services/room-allocation';
import { FeeConfig, Setting } from '../../../service/setting';

@Component({
  selector: 'app-fee-configuration-add-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './fee-configuration-add-edit.html',
  styleUrl: './fee-configuration-add-edit.scss',
})
export class FeeConfigurationAddEdit implements OnInit {
  configForm!: FormGroup;
  isEditMode: boolean = false;
  configIdParam: string | null = null;
  submitted: boolean = false;

  // Master lists
  hostels: HostelInfo[] = [];
  currencies = ['INR', 'USD', 'EUR', 'GBP', 'AUD', 'CAD'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingService: Setting,
    private allocationService: RoomAllocation
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadHostels();
    this.checkEditMode();
  }

  private initForm() {
    this.configForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      hostelId: ['', [Validators.required]],
      defaultHostelFee: ['', [Validators.required, Validators.min(0)]],
      securityDeposit: ['', [Validators.required, Validators.min(0)]],
      lateFeePerDay: ['', [Validators.required, Validators.min(0)]],
      currency: ['INR', [Validators.required]],
      paymentDueDays: ['', [Validators.required, Validators.min(0)]],
      receiptPrefix: ['', [Validators.required]],
      status: ['Active', [Validators.required]]
    });
  }

  private loadHostels() {
    this.hostels = this.allocationService.getHostels();
  }

  private checkEditMode() {
    this.configIdParam = this.route.snapshot.paramMap.get('id');
    if (this.configIdParam) {
      this.isEditMode = true;
      const configData = this.settingService.getFeeConfigById(this.configIdParam);
      if (configData) {
        this.configForm.patchValue(configData);
      } else {
        this.router.navigate(['/setting/fee-configuration']);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.configForm.invalid) {
      this.configForm.markAllAsTouched();
      return;
    }

    const formValue = this.configForm.value;
    const hostel = this.hostels.find(h => h.id === formValue.hostelId);

    const configValue: FeeConfig = {
      id: formValue.id || this.generateConfigId(),
      name: formValue.name,
      hostelId: formValue.hostelId,
      hostelName: hostel ? hostel.name : 'Unknown Hostel',
      defaultHostelFee: formValue.defaultHostelFee,
      securityDeposit: formValue.securityDeposit,
      lateFeePerDay: formValue.lateFeePerDay,
      currency: formValue.currency,
      paymentDueDays: formValue.paymentDueDays,
      receiptPrefix: formValue.receiptPrefix,
      status: formValue.status
    };

    let success = false;
    if (this.isEditMode) {
      success = this.settingService.updateFeeConfig(configValue);
    } else {
      success = this.settingService.addFeeConfig(configValue);
    }

    if (success) {
      this.router.navigate(['/setting/fee-configuration']);
    }
  }

  private generateConfigId(): string {
    const lists = this.settingService.getFeeConfigs();
    if (lists.length === 0) return 'FCFG-001';
    const ids = lists.map(i => {
      const match = i.id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const nextNum = Math.max(...ids) + 1;
    return `FCFG-${nextNum.toString().padStart(3, '0')}`;
  }
}

