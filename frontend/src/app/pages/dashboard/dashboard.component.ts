import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;padding-top:80px;padding-bottom:80px;font-family:'Poppins',sans-serif;">
      <div style="max-width:1280px;margin:0 auto;padding:0 20px;">

        <!-- Greeting -->
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">

          <div style="display:flex;flex-direction:column;gap:4px;">
            <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;">{{ greeting }}, {{ userName }} 👋</h1>
            <p style="color:#666666;font-size:15px;">Here's your financial overview for September 2026</p>
          </div>

          <div style="display:flex;align-items:center;gap:12px;background:white;border:1px solid #E5E5E5;border-radius:12px;padding:8px 16px;align-self:flex-start;">
            <span style="font-weight:500;color:#1A1A1A;font-size:14px;">MoMo Balance</span>
            <span style="width:1px;height:16px;background:#E5E5E5;"></span>
            <span style="font-weight:700;color:#1A1A1A;font-size:14px;">R 2 340.00</span>
          </div>

        </div>

        <!-- Stat Cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;">

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.06);" class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
              <div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:#FFF3EE;">📄</div>
              <div style="width:8px;height:8px;border-radius:50%;background:#FF6B35;"></div>
            </div>
            <div style="font-size:24px;font-weight:700;color:#1A1A1A;">R 840</div>
            <div style="font-size:12px;color:#666;font-weight:500;">Bills Due</div>
            <div style="font-size:12px;color:#999;margin-top:2px;">2 bills pending</div>
          </div>

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.06);" class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
              <div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:#EDFAF4;">🏦</div>
              <div style="width:8px;height:8px;border-radius:50%;background:#00A86B;"></div>
            </div>
            <div style="font-size:24px;font-weight:700;color:#1A1A1A;">R 6 250</div>
            <div style="font-size:12px;color:#666;font-weight:500;">Total Saved</div>
            <div style="font-size:12px;color:#999;margin-top:2px;">3 active pots</div>
          </div>

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.06);" class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
              <div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:#FEF2F2;">⚠️</div>
              <div style="width:8px;height:8px;border-radius:50%;background:#E74C3C;"></div>
            </div>
            <div style="font-size:24px;font-weight:700;color:#E74C3C;">R 350</div>
            <div style="font-size:12px;color:#666;font-weight:500;">Overdue</div>
            <div style="font-size:12px;color:#999;margin-top:2px;">1 bill overdue</div>
          </div>

          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;transition:all 0.3s;box-shadow:0 1px 3px rgba(0,0,0,0.06);" class="stat-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
              <div style="width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:#FFFBEB;">📊</div>
              <div style="width:8px;height:8px;border-radius:50%;background:#FFCB05;"></div>
            </div>
            <div style="font-size:24px;font-weight:700;color:#1A1A1A;">R 6 800</div>
            <div style="font-size:12px;color:#666;font-weight:500;">Monthly Spend</div>
            <div style="font-size:12px;color:#999;margin-top:2px;">68% of budget</div>
          </div>

        </div>

        <!-- Recent Activity -->
        <div style="display:grid;grid-template-columns:1fr;gap:24px;">

          <div style="background:white;border-radius:16px;border:1px solid #E5E5E5;overflow:hidden;">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid #E5E5E5;">
              <h2 style="font-weight:600;font-size:16px;color:#1A1A1A;">Recent Activity</h2>
              <a routerLink="/bills" style="font-size:12px;color:#FFCB05;font-weight:600;text-decoration:none;">View all →</a>
            </div>

            <div style="display:flex;flex-direction:column;">
              <div *ngFor="let item of recentActivity" style="display:flex;align-items:center;gap:12px;padding:14px 20px;border-bottom:1px solid #F7F7F7;transition:all 0.3s;" class="activity-item">
                <div style="width:36px;height:36px;border-radius:12px;background:#F7F7F7;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">
                  {{ item.type === 'payment' ? '💸' : item.type === 'savings' ? '🏦' : item.type === 'airtime' ? '📱' : '💚' }}
                </div>
                <div style="flex:1;min-width:0;">
                  <div style="font-size:14px;font-weight:500;color:#1A1A1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ item.desc }}</div>
                  <div style="font-size:12px;color:#999;">{{ item.date }}</div>
                </div>
                <div style="text-align:right;flex-shrink:0;">
                  <div style="font-size:14px;font-weight:600;color:{{ item.amount > 0 ? '#00A86B' : '#1A1A1A' }};">
                    {{ item.amount > 0 ? '+' : '' }}R {{ item.amount | number:'1.0-0' }}
                  </div>
                  <div style="margin-top:2px;">
                    <span style="padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:{{ getBadgeBg(item.status) }};color:{{ getBadgeColor(item.status) }};">
                      {{ item.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions & Budget -->
          <div style="display:flex;flex-direction:column;gap:16px;">

            <div style="background:white;border-radius:16px;padding:20px;border:1px solid #E5E5E5;">
              <h2 style="font-weight:600;font-size:16px;color:#1A1A1A;margin-bottom:16px;">Quick Actions</h2>
              <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
                <a *ngFor="let action of quickActions" routerLink="/{{ action.page }}" style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;border-radius:12px;background:#F7F7F7;text-decoration:none;color:#1A1A1A;transition:all 0.3s;" class="quick-action">
                  <span style="font-size:24px;">{{ action.icon }}</span>
                  <span style="font-size:12px;font-weight:500;text-align:center;">{{ action.label }}</span>
                </a>
              </div>
            </div>

            <div style="background:black;border-radius:16px;padding:20px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
                <span style="font-size:12px;font-weight:600;color:#FFCB05;text-transform:uppercase;letter-spacing:1px;">Budget Snapshot</span>
                <a routerLink="/budget" style="font-size:12px;color:rgba(255,255,255,0.5);text-decoration:none;transition:color 0.3s;">Details →</a>
              </div>
              <div *ngFor="let b of budgetItems" style="margin-bottom:12px;">
                <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px;">
                  <span style="color:rgba(255,255,255,0.8);">{{ b.cat }}</span>
                  <span style="color:rgba(255,255,255,0.5);">R {{ b.spent }} / R {{ b.total }}</span>
                </div>
                <div style="width:100%;background:rgba(255,255,255,0.1);border-radius:9999px;height:6px;">
                  <div style="height:6px;border-radius:9999px;background:#FFCB05;width:{{ (b.spent / b.total) * 100 }}%;transition:width 1s ease;"></div>
                </div>
              </div>
            </div>

            <div *ngFor="let tip of tips" style="background:#FFFBEB;border:1px solid rgba(255,203,5,0.3);border-radius:16px;padding:16px;">
              <div style="font-weight:600;font-size:14px;color:#1A1A1A;margin-bottom:4px;">{{ tip.title }}</div>
              <p style="font-size:12px;color:#666;line-height:1.6;margin:0;">{{ tip.body }}</p>
            </div>

          </div>
        </div>
      </div>
    </div>

    <style>
      .stat-card:hover {
        box-shadow: 0 4px 20px rgba(0,0,0,0.08);
        transform: translateY(-2px);
      }
      .activity-item:hover {
        background: #F7F7F7;
      }
      .quick-action:hover {
        background: #FFCB05;
        transform: scale(1.02);
      }
      @media (min-width: 1024px) {
        .dashboard-grid { grid-template-columns: 2fr 1fr; }
      }
    </style>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {
  userName = 'User';
  greeting = 'Good morning';
  currentUser: any = null;

  recentActivity = [
    { id: 1, type: 'payment', desc: 'DSTV Premium Subscription', amount: -699, date: 'Today, 09:14', status: 'paid' },
    { id: 2, type: 'savings', desc: 'School Fees Pot contribution', amount: -500, date: 'Yesterday, 18:30', status: 'saved' },
    { id: 3, type: 'payment', desc: 'Eskom Prepaid Electricity', amount: -350, date: '28 Aug, 11:00', status: 'paid' },
    { id: 4, type: 'airtime', desc: 'MTN Airtime Recharge', amount: -50, date: '27 Aug, 14:22', status: 'paid' },
    { id: 5, type: 'receive', desc: 'Money received from Nomsa M.', amount: 200, date: '26 Aug, 08:00', status: 'received' },
    { id: 6, type: 'payment', desc: 'City of Cape Town Water', amount: -350, date: '25 Aug, 10:45', status: 'overdue' }
  ];

  quickActions = [
    { label: 'Pay Bill', icon: '📄', page: 'bills' },
    { label: 'Buy Airtime', icon: '📱', page: 'bills' },
    { label: 'Save Money', icon: '🏦', page: 'savings' },
    { label: 'View Budget', icon: '📊', page: 'budget' }
  ];

  budgetItems = [
    { cat: 'Utilities', spent: 1200, total: 1500 },
    { cat: 'Entertainment', spent: 699, total: 800 },
    { cat: 'Food & Grocery', spent: 3200, total: 4000 },
    { cat: 'Transport', spent: 950, total: 1200 }
  ];

  tips = [
    { title: '💡 Tip: Automate your DSTV payment', body: 'Set DSTV as a recurring bill to never miss a payment — save R 50 in late fees each month.' },
    { title: '📈 Did you know?', body: 'South African households spend an average of 8% of income on electricity. Track yours under Budget.' }
  ];

  constructor(
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const hour = new Date().getHours();
    this.greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    // Get the logged-in user
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.fullName || 'User';
    }
  }

  getBadgeBg(status: string): string {
    const map: any = { paid: '#EDFAF4', saved: '#EDFAF4', overdue: '#FEF2F2', received: '#FFFBEB' };
    return map[status] || '#EDFAF4';
  }

  getBadgeColor(status: string): string {
    const map: any = { paid: '#00A86B', saved: '#00A86B', overdue: '#E74C3C', received: '#B8860B' };
    return map[status] || '#00A86B';
  }

  t(key: string): string {
    return this.languageService.get(key);
  }
}
