import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Validator to check if password and confirm password match
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (!password || !confirmPassword) return null;
  if (confirmPassword.errors && !confirmPassword.errors['passwordMismatch']) {
    return null; // Return if another validator has already found an error on confirmPassword
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true };
  } else {
    confirmPassword.setErrors(null);
    return null;
  }
}

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  isLoading = signal(false);
  notification = signal<{ type: 'success' | 'error'; message: string } | null>(null);
  passwordStrength = signal<{ score: number; label: string; class: string }>({ score: 0, label: '', class: '' });
  
  private sub!: Subscription;

  roles = [
    { value: 'administrator', label: 'Security Admin (Full Access)' },
    { value: 'manager', label: 'Operations Manager (Read/Write)' },
    { value: 'staff', label: 'Standard Support Staff (Read Only)' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });

    // Watch password changes to compute strength score
    this.sub = this.registrationForm.get('password')!.valueChanges.subscribe(val => {
      this.checkPasswordStrength(val);
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPassword() {
    this.showConfirmPassword.update(v => !v);
  }

  checkPasswordStrength(password: string) {
    if (!password) {
      this.passwordStrength.set({ score: 0, label: '', class: '' });
      return;
    }
    
    let score = 0;
    
    // Rule 1: Length >= 8
    if (password.length >= 8) score++;
    
    // Rule 2: Contains both uppercase and lowercase letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    
    // Rule 3: Contains a number or a special symbol
    if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    let label = 'Weak';
    let className = 'weak';
    
    if (score === 2) {
      label = 'Medium';
      className = 'medium';
    } else if (score >= 3) {
      label = 'Strong';
      className = 'strong';
    }

    this.passwordStrength.set({ score, label, class: className });
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.notification.set(null);

    // Mock API call to create user for Hostel
    setTimeout(() => {
      this.isLoading.set(false);
      
      const formVal = this.registrationForm.value;
      this.notification.set({
        type: 'success',
        message: `Account created for ${formVal.email}! Redirecting to login...`
      });

      // Redirect to login page after success delay
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
      }, 2000);
    }, 1500);
  }
}
