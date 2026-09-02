import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width:1280px;margin:0 auto;padding:24px 20px;">
      <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;margin-bottom:24px;">⚙️ Settings</h1>

      <!-- Language Settings -->
      <div class="card" style="margin-bottom:20px;">
        <h3 style="font-size:18px;font-weight:600;margin-bottom:16px;">🌍 Language Preferences</h3>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div>
            <label style="font-weight:500;display:block;margin-bottom:4px;color:#666666;">App Language</label>
            <select [(ngModel)]="selectedLanguage" (change)="changeLanguage()" style="width:100%;max-width:300px;padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-family:'Poppins',sans-serif;">
              <option *ngFor="let lang of languages" [value]="lang.code">{{ lang.flag }} {{ lang.name }}</option>
            </select>
            <p style="font-size:13px;color:#666666;margin-top:4px;">Choose your preferred language for the app</p>
          </div>
        </div>
      </div>

      <!-- Country Settings -->
      <div class="card" style="margin-bottom:20px;">
        <h3 style="font-size:18px;font-weight:600;margin-bottom:16px;">📍 Country</h3>
        <div>
          <label style="font-weight:500;display:block;margin-bottom:4px;color:#666666;">Your Country</label>
          <select [(ngModel)]="selectedCountry" style="width:100%;max-width:300px;padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-family:'Poppins',sans-serif;">
            <option value="SOUTH_AFRICA">🇿🇦 South Africa</option>
            <option value="NIGERIA">🇳🇬 Nigeria</option>
            <option value="GHANA">🇬🇭 Ghana</option>
            <option value="UGANDA">🇺🇬 Uganda</option>
            <option value="KENYA">🇰🇪 Kenya</option>
            <option value="RWANDA">🇷🇼 Rwanda</option>
            <option value="COTE_D_IVOIRE">🇨🇮 Côte d'Ivoire</option>
            <option value="CAMEROON">🇨🇲 Cameroon</option>
          </select>
          <p style="font-size:13px;color:#666666;margin-top:4px;">Your country determines local providers and currency</p>
        </div>
      </div>

      <!-- Currency Settings -->
      <div class="card" style="margin-bottom:20px;">
        <h3 style="font-size:18px;font-weight:600;margin-bottom:16px;">💰 Currency</h3>
        <div>
          <label style="font-weight:500;display:block;margin-bottom:4px;color:#666666;">Display Currency</label>
          <select [(ngModel)]="selectedCurrency" style="width:100%;max-width:300px;padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-family:'Poppins',sans-serif;">
            <option value="ZAR">R - South African Rand</option>
            <option value="NGN">₦ - Nigerian Naira</option>
            <option value="GHS">₵ - Ghanaian Cedi</option>
            <option value="UGX">USh - Ugandan Shilling</option>
            <option value="KES">KSh - Kenyan Shilling</option>
            <option value="RWF">FRw - Rwandan Franc</option>
            <option value="XOF">CFA - West African CFA</option>
          </select>
        </div>
      </div>

      <!-- Notifications -->
      <div class="card" style="margin-bottom:20px;">
        <h3 style="font-size:18px;font-weight:600;margin-bottom:16px;">🔔 Notifications</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F7F7F7;">
            <div>
              <div style="font-weight:500;">Push Notifications</div>
              <div style="font-size:13px;color:#666666;">Receive bill reminders and alerts</div>
            </div>
            <label style="position:relative;display:inline-block;width:50px;height:26px;">
              <input type="checkbox" [(ngModel)]="pushNotifications" style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#ccc;border-radius:26px;transition:.3s;" [style.background]="pushNotifications ? '#FFCB05' : '#ccc'">
                <span style="position:absolute;content:'';height:20px;width:20px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.3s;" [style.transform]="pushNotifications ? 'translateX(24px)' : 'translateX(0)'"></span>
              </span>
            </label>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F7F7F7;">
            <div>
              <div style="font-weight:500;">Bill Reminders</div>
              <div style="font-size:13px;color:#666666;">Get reminded before bills are due</div>
            </div>
            <label style="position:relative;display:inline-block;width:50px;height:26px;">
              <input type="checkbox" [(ngModel)]="billReminders" style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#ccc;border-radius:26px;transition:.3s;" [style.background]="billReminders ? '#FFCB05' : '#ccc'">
                <span style="position:absolute;content:'';height:20px;width:20px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.3s;" [style.transform]="billReminders ? 'translateX(24px)' : 'translateX(0)'"></span>
              </span>
            </label>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">
            <div>
              <div style="font-weight:500;">Savings Goals</div>
              <div style="font-size:13px;color:#666666;">Progress updates on your savings goals</div>
            </div>
            <label style="position:relative;display:inline-block;width:50px;height:26px;">
              <input type="checkbox" [(ngModel)]="savingsUpdates" style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:#ccc;border-radius:26px;transition:.3s;" [style.background]="savingsUpdates ? '#FFCB05' : '#ccc'">
                <span style="position:absolute;content:'';height:20px;width:20px;left:3px;bottom:3px;background:white;border-radius:50%;transition:.3s;" [style.transform]="savingsUpdates ? 'translateX(24px)' : 'translateX(0)'"></span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <!-- Account -->
      <div class="card" style="margin-bottom:20px;border-left:4px solid #E74C3C;">
        <h3 style="font-size:18px;font-weight:600;margin-bottom:16px;">👤 Account</h3>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F7F7F7;">
            <span style="color:#666666;">Name</span>
            <span style="font-weight:500;">{{ userName }}</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F7F7F7;">
            <span style="color:#666666;">Phone</span>
            <span style="font-weight:500;">{{ phoneNumber }}</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;">
            <span style="color:#666666;">Member Since</span>
            <span style="font-weight:500;">September 2026</span>
          </div>
          <button (click)="logout()" style="background:#E74C3C;color:white;border:none;padding:12px;border-radius:10px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;margin-top:8px;">Logout</button>
        </div>
      </div>

      <!-- App Info -->
      <div style="text-align:center;padding:20px 0;color:#666666;font-size:13px;">
        <p>MoMo Everyday Essentials v2.0</p>
        <p style="margin-top:4px;">Built for the MoMo Mini App Hackathon 2026</p>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent {
  languages: any[] = [];
  selectedLanguage: string = 'en';
  selectedCountry: string = 'SOUTH_AFRICA';
  selectedCurrency: string = 'ZAR';
  pushNotifications: boolean = true;
  billReminders: boolean = true;
  savingsUpdates: boolean = true;
  userName: string = 'Thabo Mokoena';
  phoneNumber: string = '+27 71 234 5678';

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.languages = this.languageService.languages;
    this.selectedLanguage = this.languageService.getCurrentLanguage();
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.fullName || 'Thabo Mokoena';
      this.phoneNumber = user.phoneNumber || '+27 71 234 5678';
    }
  }

  changeLanguage() {
    this.languageService.setLanguage(this.selectedLanguage);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
