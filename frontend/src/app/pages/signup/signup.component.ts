import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;display:flex;align-items:center;justify-content:center;padding:0 16px;padding-top:64px;font-family:'Poppins',sans-serif;">
      <div style="background:white;border-radius:24px;padding:32px;max-width:400px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.15);">
        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:24px;font-weight:700;color:#1A1A1A;">🏦 MoMo Everyday</h1>
          <p style="color:#666666;margin-top:4px;">Create your account</p>
        </div>

        <div *ngIf="errorMessage" style="background:#FEF2F2;color:#E74C3C;padding:12px;border-radius:12px;font-size:14px;margin-bottom:16px;">
          ⚠️ {{ errorMessage }}
        </div>

        <form (ngSubmit)="onSignup()">
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:14px;font-weight:500;color:#1A1A1A;margin-bottom:4px;">👤 Full Name</label>
            <input type="text" [(ngModel)]="fullName" name="fullName" placeholder="Thabo Mokoena" required style="width:100%;border:1px solid #E5E5E5;border-radius:12px;padding:12px 16px;font-size:16px;outline:none;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:14px;font-weight:500;color:#1A1A1A;margin-bottom:4px;">📱 Phone Number</label>
            <input type="tel" [(ngModel)]="phoneNumber" name="phoneNumber" placeholder="071 234 5678" required style="width:100%;border:1px solid #E5E5E5;border-radius:12px;padding:12px 16px;font-size:16px;outline:none;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:14px;font-weight:500;color:#1A1A1A;margin-bottom:4px;">🔒 Password</label>
            <input type="password" [(ngModel)]="password" name="password" placeholder="Min 8 characters" required style="width:100%;border:1px solid #E5E5E5;border-radius:12px;padding:12px 16px;font-size:16px;outline:none;box-sizing:border-box;">
          </div>

          <button type="submit" style="width:100%;background:#FFCB05;color:black;font-weight:600;padding:12px;border-radius:12px;border:none;cursor:pointer;font-size:16px;font-family:'Poppins',sans-serif;">Get Started</button>
        </form>

        <p style="text-align:center;font-size:14px;color:#666666;margin-top:24px;">
          Already have an account? <a routerLink="/login" style="color:#FFCB05;font-weight:500;text-decoration:none;">Sign In</a>
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class SignupComponent {
  fullName = '';
  phoneNumber = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.errorMessage = '';

    if (!this.fullName || !this.phoneNumber || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters';
      return;
    }

    this.authService.signup({
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      password: this.password,
      country: 'SOUTH_AFRICA',
      language: 'en'
    }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Signup failed. Please try again.';
      }
    });
  }
}
