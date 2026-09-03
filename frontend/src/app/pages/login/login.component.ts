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
          <div style="display:inline-block;background:#e8f5e9;color:#2e7d32;padding:4px 14px;border-radius:20px;font-size:12px;margin-top:8px;">🔒 Secure Login</div>
        </div>

        <div *ngIf="errorMessage" style="background:#FEF2F2;color:#E74C3C;padding:12px;border-radius:12px;font-size:14px;margin-bottom:16px;">
          ⚠️ {{ errorMessage }}
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

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;font-size:14px;">
            <label style="display:flex;align-items:center;gap:8px;color:#555;cursor:pointer;">
              <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe"> Remember me
            </label>
            <a href="#" style="color:#6C1B8C;text-decoration:none;">Forgot password?</a>
          </div>

          <button type="submit" style="width:100%;background:#FFCB05;color:black;font-weight:600;padding:12px;border-radius:12px;border:none;cursor:pointer;font-size:16px;font-family:'Poppins',sans-serif;">Sign In</button>
        </form>

        <p style="text-align:center;font-size:14px;color:#666666;margin-top:24px;">
          Don't have an account? <a routerLink="/signup" style="color:#FFCB05;font-weight:500;text-decoration:none;">Get Started</a>
        </p>

        <div style="display:flex;align-items:center;margin:20px 0 16px;color:#999;font-size:13px;">
          <span style="flex:1;height:1px;background:#e0e0e0;"></span>
          <span style="padding:0 16px;">or continue with</span>
          <span style="flex:1;height:1px;background:#e0e0e0;"></span>
        </div>

        <div style="display:flex;gap:10px;margin-bottom:16px;">
          <button style="flex:1;padding:10px;border:2px solid #e0e0e0;border-radius:10px;background:white;cursor:pointer;font-weight:500;font-size:14px;">🔴 Google</button>
          <button style="flex:1;padding:10px;border:2px solid #e0e0e0;border-radius:10px;background:white;cursor:pointer;font-weight:500;font-size:14px;">🔵 Facebook</button>
          <button style="flex:1;padding:10px;border:2px solid #e0e0e0;border-radius:10px;background:white;cursor:pointer;font-weight:500;font-size:14px;">💜 MoMo</button>
        </div>

        <p style="text-align:center;font-size:12px;color:#999;margin-top:8px;">No bank account required. Works with any MTN number.</p>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent {
  phoneNumber = '';
  password = '';
  rememberMe = false;
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.phoneNumber || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }
    this.authService.login(this.phoneNumber, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.errorMessage = err.message || 'Invalid credentials'
    });
  }
}
