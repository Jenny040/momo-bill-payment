import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;padding-top:80px;padding-bottom:80px;">
      <div style="max-width:1280px;margin:0 auto;padding:0 20px;">

        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
          <div>
            <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;">{{ 'dashboard.welcome' | translate:{name: userName} }}</h1>
            <p style="color:#666666;font-size:15px;">{{ 'dashboard.subtitle' | translate }}</p>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:white;border:1px solid #E5E5E5;border-radius:12px;padding:8px 16px;align-self:flex-start;">
            <span style="font-weight:500;color:#1A1A1A;font-size:14px;">{{ 'dashboard.balance' | translate }}</span>
            <span style="width:1px;height:16px;background:#E5E5E5;"></span>
            <span style="font-weight:700;color:#1A1A1A;font-size:14px;">R 2 340.00</span>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;">
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #FF6B35;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <span style="font-size:22px;">📄</span>
              <span style="font-size:13px;color:#666;font-weight:500;">{{ 'dashboard.billsDue' | translate }}</span>
            </div>
            <div style="font-size:26px;font-weight:700;color:#1A1A1A;">R 1,840</div>
            <div style="font-size:14px;color:#666;">2 {{ 'bills.pending' | translate | lowercase }}</div>
          </div>

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #00A86B;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <span style="font-size:22px;">🏦</span>
              <span style="font-size:13px;color:#666;font-weight:500;">{{ 'dashboard.totalSaved' | translate }}</span>
            </div>
            <div style="font-size:26px;font-weight:700;color:#1A1A1A;">R 6,250</div>
            <div style="font-size:14px;color:#666;">3 {{ 'nav.savings' | translate | lowercase }}</div>
          </div>

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #E74C3C;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <span style="font-size:22px;">⚠️</span>
              <span style="font-size:13px;color:#666;font-weight:500;">{{ 'dashboard.overdue' | translate }}</span>
            </div>
            <div style="font-size:26px;font-weight:700;color:#E74C3C;">R 350</div>
            <div style="font-size:14px;color:#666;">1 {{ 'bills.overdue' | translate | lowercase }}</div>
          </div>

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #FFCB05;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
              <span style="font-size:22px;">📊</span>
              <span style="font-size:13px;color:#666;font-weight:500;">{{ 'dashboard.monthlySpend' | translate }}</span>
            </div>
            <div style="font-size:26px;font-weight:700;color:#1A1A1A;">R 6,798</div>
            <div style="font-size:14px;color:#666;">68% of {{ 'budget.title' | translate | lowercase }}</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:28px;">
          <a routerLink="/bills" style="background:#FFCB05;color:black;padding:10px 24px;border-radius:10px;font-weight:600;text-decoration:none;">💰 {{ 'bills.payNow' | translate }}</a>
          <a routerLink="/savings" style="background:black;color:#FFCB05;padding:10px 24px;border-radius:10px;font-weight:600;text-decoration:none;">💎 {{ 'savings.title' | translate }}</a>
          <a routerLink="/budget" style="background:#F7F7F7;color:#1A1A1A;padding:10px 24px;border-radius:10px;font-weight:600;text-decoration:none;border:1px solid #E5E5E5;">📊 {{ 'budget.title' | translate }}</a>
        </div>

        <div style="background:white;border-radius:16px;padding:20px;border:1px solid #E5E5E5;">
          <h3 style="font-size:18px;font-weight:600;margin-bottom:16px;">📋 {{ 'dashboard.recentActivity' | translate }}</h3>
          <div style="border-bottom:1px solid #E5E5E5;padding:12px 0;display:flex;align-items:center;gap:12px;">
            <span style="font-size:20px;">📺</span>
            <div style="flex:1;"><div style="font-weight:500;">DSTV Premium Subscription</div><div style="font-size:13px;color:#666;">Today, 09:14</div></div>
            <div style="text-align:right;"><div style="font-weight:600;color:#1A1A1A;">-R 699</div><span style="background:#EDFAF4;color:#00A86B;padding:2px 8px;border-radius:9999px;font-size:11px;">{{ 'bills.paid' | translate }}</span></div>
          </div>
          <div style="border-bottom:1px solid #E5E5E5;padding:12px 0;display:flex;align-items:center;gap:12px;">
            <span style="font-size:20px;">🏦</span>
            <div style="flex:1;"><div style="font-weight:500;">School Fees Pot contribution</div><div style="font-size:13px;color:#666;">Yesterday, 18:30</div></div>
            <div style="text-align:right;"><div style="font-weight:600;color:#00A86B;">-R 500</div><span style="background:#EDFAF4;color:#00A86B;padding:2px 8px;border-radius:9999px;font-size:11px;">{{ 'savings.title' | translate }}</span></div>
          </div>
          <div style="padding:12px 0;display:flex;align-items:center;gap:12px;">
            <span style="font-size:20px;">⚡</span>
            <div style="flex:1;"><div style="font-weight:500;">Eskom Prepaid Electricity</div><div style="font-size:13px;color:#666;">28 Aug, 11:00</div></div>
            <div style="text-align:right;"><div style="font-weight:600;color:#E74C3C;">-R 350</div><span style="background:#FEF2F2;color:#E74C3C;padding:2px 8px;border-radius:9999px;font-size:11px;">{{ 'bills.overdue' | translate }}</span></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  userName: string = 'User';

  constructor(
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.fullName || 'User';
    } else {
      this.userName = 'User';
    }
  }
}
