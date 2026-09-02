import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;display:flex;align-items:center;justify-content:center;padding:0 16px;padding-top:64px;font-family:'Poppins',sans-serif;">
      <div style="background:white;border-radius:24px;padding:32px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.15);">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:24px;font-weight:700;color:#1A1A1A;">🏦 MoMo Everyday</h1>
          <p style="color:#666666;margin-top:4px;">Sign in to your account</p>
        </div>

        <div *ngIf="errorMessage" style="background:#FEF2F2;color:#E74C3C;padding:12px;border-radius:12px;font-size:14px;margin-bottom:16px;">
          ⚠️ {{ errorMessage }}
        </div>

        <div *ngIf="successMessage" style="background:#E8F5E9;color:#00A86B;padding:12px;border-radius:12px;font-size:14px;margin-bottom:16px;">
          ✅ {{ successMessage }}
        </div>

        <form (ngSubmit)="onLogin()">
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:14px;font-weight:500;color:#1A1A1A;margin-bottom:4px;">📱 Phone Number</label>
            <input type="tel" [(ngModel)]="phoneNumber" name="phoneNumber" placeholder="071 234 5678" required style="width:100%;border:1px solid #E5E5E5;border-radius:12px;padding:12px 16px;font-size:16px;outline:none;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:14px;font-weight:500;color:#1A1A1A;margin-bottom:4px;">🔒 Password</label>
            <input [type]="showPassword ? 'text' : 'password'" [(ngModel)]="password" name="password" placeholder="Enter your password" required style="width:100%;border:1px solid #E5E5E5;border-radius:12px;padding:12px 16px;font-size:16px;outline:none;box-sizing:border-box;">
          </div>

          <button type="submit" style="width:100%;background:#FFCB05;color:black;font-weight:600;padding:12px;border-radius:12px;border:none;cursor:pointer;font-size:16px;font-family:'Poppins',sans-serif;">Sign In</button>
        </form>

        <p style="text-align:center;font-size:14px;color:#666666;margin-top:24px;">
          Don't have an account? <a routerLink="/signup" style="color:#FFCB05;font-weight:500;text-decoration:none;">Get Started</a>
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  phoneNumber = '';
  password = '';
  showPassword = false;
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.phoneNumber || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.authService.login(this.phoneNumber, this.password).subscribe({
      next: () => {
        this.successMessage = 'Welcome back! Redirecting...';
        setTimeout(() => this.router.navigate(['/dashboard']), 1000);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Login failed. Please try again.';
      }
    });
  }
}
