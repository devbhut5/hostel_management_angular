import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HostelInfoDetail, Setting } from '../../../service/setting';

@Component({
  selector: 'app-hostel-information-add-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './hostel-information-add-edit.html',
  styleUrl: './hostel-information-add-edit.scss',
})
export class HostelInformationAddEdit implements OnInit {
  hostelForm!: FormGroup;
  isEditMode: boolean = false;
  hostelIdParam: string | null = null;
  submitted: boolean = false;

  // Image Upload Preview
  logoPreviewUrl: string = '';

  hostelTypes = ['Boys', 'Girls', 'Both'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingService: Setting
  ) { }

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  private initForm() {
    this.hostelForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      type: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
      contactNumber: ['', [Validators.required]],
      email: ['', [Validators.email]],
      wardenName: ['', [Validators.required]],
      wardenMobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      description: [''],
      status: ['Active', [Validators.required]]
    });
  }

  private checkEditMode() {
    this.hostelIdParam = this.route.snapshot.paramMap.get('id');
    if (this.hostelIdParam) {
      this.isEditMode = true;
      const hostelData = this.settingService.getHostelInfoById(this.hostelIdParam);
      if (hostelData) {
        this.hostelForm.patchValue(hostelData);
        if (hostelData.logo) {
          this.logoPreviewUrl = hostelData.logo;
        }
      } else {
        this.router.navigate(['/setting/hostel-information']);
      }
    }
  }

  onLogoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  clearLogo() {
    this.logoPreviewUrl = '';
    const fileInput = document.getElementById('logoUpload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.hostelForm.invalid) {
      this.hostelForm.markAllAsTouched();
      return;
    }

    const formValue = this.hostelForm.value;

    const hostelValue: HostelInfoDetail = {
      id: formValue.id || this.generateHostelId(),
      name: formValue.name,
      code: formValue.code,
      type: formValue.type,
      address: formValue.address,
      city: formValue.city,
      state: formValue.state,
      pincode: formValue.pincode,
      contactNumber: formValue.contactNumber,
      email: formValue.email || undefined,
      wardenName: formValue.wardenName,
      wardenMobile: formValue.wardenMobile,
      logo: this.logoPreviewUrl || undefined,
      description: formValue.description || undefined,
      status: formValue.status
    };

    let success = false;
    if (this.isEditMode) {
      success = this.settingService.updateHostelInfo(hostelValue);
    } else {
      success = this.settingService.addHostelInfo(hostelValue);
    }

    if (success) {
      this.router.navigate(['/setting/hostel-information']);
    }
  }

  private generateHostelId(): string {
    const lists = this.settingService.getHostelInfos();
    if (lists.length === 0) return 'HINF-001';
    const ids = lists.map(i => {
      const match = i.id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const nextNum = Math.max(...ids) + 1;
    return `HINF-${nextNum.toString().padStart(3, '0')}`;
  }
}

