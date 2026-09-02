import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { UserService } from '../../core/services/user.service';
import { BillService, Bill } from '../../core/services/bill.service';
import { CountryService } from '../../core/services/country.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <div class="dashboard">
      <div class="welcome-header">
        <h2>{{ 'dashboard.title' | translate:{name: user?.fullName || 'User'} }}</h2>
        <p>{{ 'dashboard.subtitle' | translate:{month: 'September', year: '2026'} }}</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <span class="stat-icon">💰</span>
          <h3>{{ 'dashboard.billsDue' | translate }}</h3>
          <p class="stat-number">{{ currencySymbol }}{{ totalBillsDue | number:'1.0-0' }}</p>
          <span class="stat-label">{{ pendingBills }} pending bills</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">💎</span>
          <h3>{{ 'dashboard.totalSaved' | translate }}</h3>
          <p class="stat-number">{{ currencySymbol }}6,250</p>
          <span class="stat-label">3 savings pots</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">⚠️</span>
          <h3>{{ 'dashboard.overdue' | translate }}</h3>
          <p class="stat-number" style="color: #e74c3c;">{{ overdueCount }}</p>
          <span class="stat-label">{{ overdueCount }} overdue bills</span>
        </div>
        <div class="stat-card">
          <span class="stat-icon">📊</span>
          <h3>{{ 'dashboard.monthlySpend' | translate }}</h3>
          <p class="stat-number">{{ currencySymbol }}6,798</p>
          <span class="stat-label">68% of budget</span>
        </div>
      </div>

      <div class="quick-actions">
        <a routerLink="/bills" class="btn btn-primary">💰 Bills</a>
        <a routerLink="/savings" class="btn btn-secondary">💎 Savings</a>
        <a routerLink="/budget" class="btn btn-info">📊 Budget</a>
      </div>

      <div class="recent-activity">
        <h3>{{ 'dashboard.recentActivity' | translate }}</h3>
        <div *ngFor="let activity of recentActivities" class="activity-item">
          <span class="activity-icon">{{ activity.icon }}</span>
          <span class="activity-text">{{ activity.text }}</span>
          <span class="activity-amount">{{ currencySymbol }}{{ activity.amount }}</span>
          <span class="activity-status" [class.paid]="activity.status === 'Paid'"
                                       [class.pending]="activity.status === 'Pending'"
                                       [class.overdue]="activity.status === 'Overdue'">
            {{ activity.status }}
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard { padding: 20px; animation: fadeIn 0.5s ease; }
    .welcome-header { margin-bottom: 2rem; }
    .welcome-header h2 { font-size: 1.8rem; margin: 0; color: #1a1a2e; }
    .welcome-header p { color: #666; margin: 5px 0 0; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 1.5rem; }
    .stat-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .stat-icon { font-size: 1.8rem; display: block; }
    .stat-card h3 { font-size: 0.85rem; color: #666; margin: 8px 0 4px; }
    .stat-number { font-size: 2rem; font-weight: bold; color: #6C1B8C; margin: 4px 0; }
    .stat-label { font-size: 0.8rem; color: #999; }
    .quick-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 1.5rem; }
    .btn { padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; transition: transform 0.2s; }
    .btn:hover { transform: scale(1.02); }
    .btn-primary { background: linear-gradient(135deg, #6C1B8C, #8B3A9E); color: white; }
    .btn-secondary { background: #FFCB05; color: #1a1a2e; }
    .btn-info { background: #e8f0fe; color: #6C1B8C; }
    .recent-activity { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .recent-activity h3 { margin: 0 0 15px 0; color: #1a1a2e; }
    .activity-item { display: flex; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0; gap: 12px; flex-wrap: wrap; }
    .activity-item:last-child { border-bottom: none; }
    .activity-icon { font-size: 1.2rem; min-width: 30px; }
    .activity-text { flex: 1; color: #333; }
    .activity-amount { font-weight: 600; color: #1a1a2e; }
    .activity-status { padding: 2px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
    .activity-status.paid { background: #00a86b; color: white; }
    .activity-status.pending { background: #ffd700; color: #1a1a2e; }
    .activity-status.overdue { background: #e74c3c; color: white; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class DashboardComponent implements OnInit {
  user: any;
  currencySymbol = 'R';
  bills: Bill[] = [];
  totalBillsDue = 0;
  pendingBills = 0;
  overdueCount = 0;

  recentActivities = [
    { icon: '📺', text: 'DSTV Premium Subscription', amount: 699, status: 'Paid' },
    { icon: '💎', text: 'School Fees Pot contribution', amount: 500, status: 'Saved' },
    { icon: '⚡', text: 'Eskom Prepaid Electricity', amount: 350, status: 'Paid' },
    { icon: '💧', text: 'City of Cape Town Water', amount: 350, status: 'Overdue' }
  ];

  constructor(
    private userService: UserService,
    private billService: BillService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.user = this.userService.getMockUser();
    this.currencySymbol = this.countryService.getCurrencySymbol(this.user.country);
    this.bills = this.billService.getMockBills(this.user.id, this.user.country);
    this.totalBillsDue = this.bills.filter(b => b.status !== 'PAID').reduce((sum, b) => sum + b.amountDue, 0);
    this.pendingBills = this.bills.filter(b => b.status !== 'PAID').length;
    this.overdueCount = this.bills.filter(b => b.status === 'OVERDUE').length;
  }
}
