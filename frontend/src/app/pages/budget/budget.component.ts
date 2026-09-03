import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;padding-top:80px;padding-bottom:80px;">
      <div style="max-width:1280px;margin:0 auto;padding:0 20px;">

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;">{{ 'budget.title' | translate }}</h1>
            <p style="color:#666666;font-size:15px;margin-top:4px;">September 2026 · 26 days tracked</p>
          </div>
          <button style="background:transparent;color:#666;border:1px solid #E5E5E5;padding:8px 16px;border-radius:10px;cursor:pointer;font-family:'Poppins',sans-serif;">Set Income</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:24px;">
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;">
            <div style="font-size:20px;margin-bottom:4px;">💸</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A1A;">R {{ totalSpent | number }}</div>
            <div style="font-size:13px;color:#666;">{{ 'budget.spent' | translate }} R {{ totalBudget | number }}</div>
          </div>
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;">
            <div style="font-size:20px;margin-bottom:4px;">🛒</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A1A;">{{ topCategory.name }}</div>
            <div style="font-size:13px;color:#666;">R {{ topCategory.spent | number }} {{ 'budget.spent' | translate | lowercase }}</div>
          </div>
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;">
            <div style="font-size:20px;margin-bottom:4px;">📅</div>
            <div style="font-size:20px;font-weight:700;color:#1A1A1A;">R {{ dailyAvg | number }}</div>
            <div style="font-size:13px;color:#666;">{{ 'budget.dailyAverage' | translate }}</div>
          </div>
          <div style="background:black;border-radius:16px;padding:16px 20px;">
            <div style="font-size:12px;color:#FFCB05;opacity:0.6;font-weight:500;">{{ 'budget.health' | translate }}</div>
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:36px;font-weight:700;color:#FFCB05;">74</span>
              <div><span style="color:white;font-weight:600;">Good</span><div style="font-size:12px;color:rgba(255,255,255,0.5);">Most categories on track</div></div>
            </div>
          </div>
        </div>

        <div style="background:white;border-radius:16px;padding:24px;border:1px solid #E5E5E5;margin-bottom:24px;">
          <h2 style="font-weight:600;color:#1A1A1A;margin-bottom:16px;">{{ 'budget.spent' | translate }} by {{ 'budget.category' | translate | lowercase }}</h2>
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
}
