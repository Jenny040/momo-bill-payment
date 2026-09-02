<<<<<<< HEAD
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';
=======
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { UserService } from '../../core/services/user.service';
import { CountryService } from '../../core/services/country.service';

interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  percentage: number;
}
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb

@Component({
  selector: 'app-budget',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;padding-top:80px;padding-bottom:80px;">
      <div style="max-width:1280px;margin:0 auto;padding:0 20px;">

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;">{{ t('budget.title') }}</h1>
            <p style="color:#666666;font-size:15px;margin-top:4px;">September 2026 · 26 days tracked</p>
          </div>
          <button style="background:transparent;color:#666;border:1px solid #E5E5E5;padding:8px 16px;border-radius:10px;cursor:pointer;font-family:'Poppins',sans-serif;">Set Income</button>
        </div>

        <!-- Stats -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:24px;">
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;">
            <div style="font-size:20px;margin-bottom:4px;">💸</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A1A;">R {{ totalSpent | number }}</div>
            <div style="font-size:13px;color:#666;">of R {{ totalBudget | number }} budget</div>
          </div>
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;">
            <div style="font-size:20px;margin-bottom:4px;">🛒</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A1A;">{{ topCategory.name }}</div>
            <div style="font-size:13px;color:#666;">R {{ topCategory.spent | number }} spent</div>
          </div>
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;">
            <div style="font-size:20px;margin-bottom:4px;">📅</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A1A;">R {{ dailyAvg | number }}</div>
            <div style="font-size:13px;color:#666;">per day this month</div>
          </div>
          <div style="background:black;border-radius:16px;padding:16px 20px;">
            <div style="font-size:12px;color:#FFCB05;opacity:0.6;font-weight:500;">Budget Health</div>
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:36px;font-weight:700;color:#FFCB05;">74</span>
              <div><span style="color:white;font-weight:600;">Good</span><div style="font-size:12px;color:rgba(255,255,255,0.5);">Most categories on track</div></div>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div style="background:white;border-radius:16px;padding:24px;border:1px solid #E5E5E5;margin-bottom:24px;">
          <h2 style="font-weight:600;color:#1A1A1A;margin-bottom:16px;">Spending by Category</h2>
          <div *ngFor="let cat of categories" style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:4px;">
              <span><span style="font-size:16px;margin-right:6px;">{{ cat.icon }}</span>{{ cat.name }}</span>
              <span style="font-weight:600;">R {{ cat.spent | number }} / R {{ cat.budget | number }}</span>
            </div>
            <div style="width:100%;background:#F7F7F7;border-radius:9999px;height:8px;">
              <div style="height:8px;border-radius:9999px;width:{{ (cat.spent / cat.budget) * 100 }}%;background:{{ cat.spent > cat.budget ? '#E74C3C' : cat.color }};transition:width 1s ease;"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;margin-top:4px;">
              <span style="color:#999;">{{ (cat.spent / cat.budget * 100) | number:'1.0-0' }}% used</span>
              <span *ngIf="cat.spent > cat.budget" style="color:#E74C3C;">R {{ (cat.spent - cat.budget) | number }} over</span>
              <span *ngIf="cat.spent <= cat.budget" style="color:#00A86B;">R {{ (cat.budget - cat.spent) | number }} left</span>
            </div>
          </div>
        </div>

        <!-- Insights -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div *ngFor="let insight of insights" style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid {{ insight.color }};">
            <div style="display:flex;gap:12px;">
              <span style="font-size:24px;">{{ insight.icon }}</span>
              <div>
                <div style="font-weight:600;font-size:14px;">{{ insight.title }}</div>
                <p style="font-size:13px;color:#666;margin-top:4px;">{{ insight.body }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class BudgetComponent {
  categories = [
    { name: 'Food & Grocery', icon: '🛒', spent: 3200, budget: 4000, color: '#FFCB05' },
    { name: 'Utilities', icon: '⚡', spent: 1200, budget: 1500, color: '#00A86B' },
    { name: 'Entertainment', icon: '🎬', spent: 899, budget: 800, color: '#E74C3C' },
    { name: 'Transport', icon: '🚗', spent: 950, budget: 1200, color: '#0077B6' },
    { name: 'Airtime & Data', icon: '📱', spent: 299, budget: 350, color: '#FF6B35' },
    { name: 'Healthcare', icon: '🏥', spent: 250, budget: 500, color: '#9333EA' }
  ];

  insights = [
    { icon: '📊', title: 'Entertainment overspend', body: "You've exceeded your entertainment budget by R 99 this month. Consider pausing one streaming subscription.", color: '#FF6B35' },
    { icon: '🎉', title: 'Great savings streak!', body: "You've stayed within budget for utilities 3 months in a row. You're saving an average of R 300/month here.", color: '#00A86B' },
    { icon: '💡', title: 'Buying electricity smartly', body: "Based on your usage, buying R 200 prepaid electricity mid-month tends to be R 12 cheaper than end-of-month.", color: '#FFCB05' }
  ];

  constructor(private languageService: LanguageService) {}

  get totalSpent() { return this.categories.reduce((s, c) => s + c.spent, 0); }
  get totalBudget() { return this.categories.reduce((s, c) => s + c.budget, 0); }
  get dailyAvg() { return Math.round(this.totalSpent / 26); }
  get topCategory() { return [...this.categories].sort((a, b) => b.spent - a.spent)[0]; }

  t(key: string): string { return this.languageService.get(key); }
=======
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="budget-page">
      <h2>{{ 'budget.title' | translate }}</h2>
      <p class="subtitle">September 2026 - 26 days tracked</p>

      <div class="summary-grid">
        <div class="summary-card">
          <h4>{{ 'budget.spent' | translate }}</h4>
          <p class="amount">{{ currencySymbol }}6,798</p>
          <span class="sub">of R8,350 budget</span>
        </div>
        <div class="summary-card">
          <h4>Top Category</h4>
          <p class="amount">Food & Grocery</p>
          <span class="sub">R3,200 spent</span>
        </div>
        <div class="summary-card">
          <h4>Daily Average</h4>
          <p class="amount">{{ currencySymbol }}261</p>
          <span class="sub">per day this month</span>
        </div>
        <div class="summary-card">
          <h4>{{ 'budget.remaining' | translate }}</h4>
          <p class="amount" style="color: #00a86b;">{{ currencySymbol }}3,202</p>
          <span class="sub">of R10,000 income</span>
        </div>
      </div>

      <div class="category-section">
        <h3>Spending by Category</h3>
        <div *ngFor="let cat of categories" class="category-item">
          <span class="category-name">{{ cat.name }}</span>
          <div class="category-bar">
            <div class="category-fill" [style.width.%]="cat.percentage" [class.over]="cat.percentage > 100"></div>
          </div>
          <span class="category-amount">{{ currencySymbol }}{{ cat.spent | number }}</span>
          <span class="category-status" [class.over]="cat.percentage > 100" [class.under]="cat.percentage <= 100">
            {{ cat.percentage > 100 ? '⚠️ Over' : '✓ On Track' }}
          </span>
        </div>
      </div>

      <div class="insights-section">
        <h3>{{ 'budget.insights' | translate }}</h3>
        <div class="insight-card">
          <span class="insight-icon">💡</span>
          <div>
            <strong>Entertainment overspend</strong>
            <p>You've exceeded your entertainment budget by R99 this month. Consider pausing one streaming subscription.</p>
          </div>
        </div>
        <div class="insight-card success">
          <span class="insight-icon">✅</span>
          <div>
            <strong>Great savings streak!</strong>
            <p>You've stayed within budget for utilities 3 months in a row. You're saving an average of R300/month here.</p>
          </div>
        </div>
        <div class="insight-card">
          <span class="insight-icon">⚡</span>
          <div>
            <strong>Buying electricity smartly</strong>
            <p>Based on your usage, buying R200 prepaid electricity mid-month tends to be R12 cheaper than end-of-month.</p>
          </div>
        </div>
      </div>

      <div class="health-section">
        <h3>{{ 'budget.health' | translate }}</h3>
        <div class="health-score">
          <span class="score">74</span>
          <span class="label">Good</span>
        </div>
        <div class="health-items">
          <span>✅ Bills paid on time</span>
          <span>✅ Savings contributions</span>
          <span>⚠️ Entertainment budget</span>
          <span>✅ Emergency fund active</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .budget-page { padding: 20px; }
    .subtitle { color: #666; margin-bottom: 1.5rem; }
    .summary-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 2rem; }
    .summary-card { background: white; padding: 16px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); text-align: center; }
    .summary-card h4 { color: #666; margin: 0 0 4px; font-size: 0.85rem; }
    .summary-card .amount { font-size: 1.5rem; font-weight: bold; color: #6C1B8C; margin: 4px 0; }
    .summary-card .sub { font-size: 0.8rem; color: #999; }
    .category-section { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 2rem; }
    .category-section h3 { margin-top: 0; margin-bottom: 1rem; }
    .category-item { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .category-item:last-child { border-bottom: none; }
    .category-name { min-width: 120px; font-weight: 500; color: #1a1a2e; }
    .category-bar { flex: 1; height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
    .category-fill { height: 100%; background: linear-gradient(90deg, #6C1B8C, #8B3A9E); border-radius: 4px; transition: width 0.5s; }
    .category-fill.over { background: linear-gradient(90deg, #e74c3c, #ff6b35); }
    .category-amount { min-width: 80px; text-align: right; font-weight: 600; color: #1a1a2e; }
    .category-status { font-size: 0.75rem; font-weight: 600; padding: 2px 8px; border-radius: 12px; }
    .category-status.over { background: #e74c3c; color: white; }
    .category-status.under { background: #00a86b; color: white; }
    .insights-section { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 2rem; }
    .insights-section h3 { margin-top: 0; margin-bottom: 1rem; }
    .insight-card { display: flex; gap: 12px; padding: 12px; background: #f8f9fa; border-radius: 8px; margin-bottom: 10px; border-left: 4px solid #6C1B8C; }
    .insight-card.success { border-left-color: #00a86b; }
    .insight-card .insight-icon { font-size: 1.5rem; }
    .insight-card strong { display: block; color: #1a1a2e; }
    .insight-card p { margin: 4px 0 0; color: #666; font-size: 0.9rem; }
    .health-section { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .health-section h3 { margin-top: 0; margin-bottom: 1rem; }
    .health-score { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; }
    .health-score .score { font-size: 2.5rem; font-weight: bold; color: #6C1B8C; }
    .health-score .label { font-size: 1.2rem; color: #00a86b; }
    .health-items { display: flex; flex-wrap: wrap; gap: 8px; }
    .health-items span { padding: 4px 12px; background: #f0f0f0; border-radius: 12px; font-size: 0.85rem; }
  `]
})
export class BudgetComponent implements OnInit {
  currencySymbol = 'R';
  categories: BudgetCategory[] = [];

  constructor(
    private userService: UserService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    const user = this.userService.getMockUser();
    this.currencySymbol = this.countryService.getCurrencySymbol(user.country);
    this.categories = [
      { name: 'Food & Grocery', spent: 3200, budget: 4000, percentage: 80 },
      { name: 'Utilities', spent: 1200, budget: 1500, percentage: 80 },
      { name: 'Entertainment', spent: 899, budget: 800, percentage: 112 },
      { name: 'Transport', spent: 950, budget: 1200, percentage: 79 },
      { name: 'Airtime & Data', spent: 299, budget: 350, percentage: 85 },
      { name: 'Healthcare', spent: 250, budget: 500, percentage: 50 }
    ];
  }
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
}
