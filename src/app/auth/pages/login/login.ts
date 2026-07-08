import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  showPassword = signal(false);
  isLoading = signal(false);
  notification = signal<{ type: 'success' | 'error'; message: string } | null>(null);

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.notification.set(null);

    // Simulate authentication api call
    setTimeout(() => {
      this.isLoading.set(false);
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // Mock validator
      if (email === 'admin@demo.com' && password === 'password123') {
        this.notification.set({
          type: 'success',
          message: 'Access granted! Connecting to Hostel Admin Portal...'
        });
      } else {
        this.notification.set({
          type: 'error',
          message: 'Invalid credentials. Hint: use admin@demo.com / password123'
        });
      }
    }, 1500);
  }
}
