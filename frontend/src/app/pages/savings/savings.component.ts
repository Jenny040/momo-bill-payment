import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { UserService } from '../../core/services/user.service';
import { CountryService } from '../../core/services/country.service';

interface SavingsPot {
  id: number;
  name: string;
  purpose: string;
  targetAmount: number;
  currentBalance: number;
  isGroupPot: boolean;
  targetDate?: string;
}

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="savings-page">
      <h2>{{ 'savings.title' | translate }}</h2>

      <div class="savings-summary">
        <div class="summary-card">
          <span>{{ 'savings.totalSaved' | translate }}</span>
          <p class="amount">{{ currencySymbol }}{{ totalSaved | number:'1.0-0' }}</p>
          <span class="sub">{{ savingsPots.length }} pots</span>
        </div>
        <div class="summary-card">
          <span>Overall Progress</span>
          <p class="amount">{{ overallProgress }}%</p>
          <span class="sub">Target: {{ currencySymbol }}{{ totalTarget | number:'1.0-0' }}</span>
        </div>
      </div>

      <div class="savings-form">
        <h3>{{ 'savings.create' | translate }}</h3>
        <form (ngSubmit)="createPot()">
          <div class="form-row">
            <input [(ngModel)]="newPot.name" name="name" placeholder="Pot Name" required class="form-input">
            <input [(ngModel)]="newPot.purpose" name="purpose" placeholder="Purpose" class="form-input">
          </div>
          <div class="form-row">
            <input [(ngModel)]="newPot.targetAmount" name="targetAmount" type="number" placeholder="Target Amount" required class="form-input">
            <input [(ngModel)]="newPot.targetDate" name="targetDate" type="date" class="form-input">
          </div>
          <div class="form-row">
            <label class="checkbox-label">
              <input [(ngModel)]="newPot.isGroupPot" name="isGroupPot" type="checkbox"> 👥 {{ 'savings.groupSavings' | translate }}
            </label>
          </div>
          <button type="submit" class="btn-primary">{{ 'savings.create' | translate }}</button>
        </form>
      </div>

      <div class="savings-pots">
        <div *ngFor="let pot of savingsPots" class="pot-card">
          <div class="pot-header">
            <div>
              <h4>{{ pot.name }}</h4>
              <span class="pot-purpose">{{ pot.purpose }}</span>
            </div>
            <span *ngIf="pot.isGroupPot" class="group-badge">👥 Group</span>
          </div>

          <div class="pot-progress">
            <div class="progress-info">
              <span>{{ currencySymbol }}{{ pot.currentBalance | number:'1.0-0' }}</span>
              <span>of {{ currencySymbol }}{{ pot.targetAmount | number:'1.0-0' }}</span>
              <span class="percentage">{{ (pot.currentBalance / pot.targetAmount * 100) | number:'1.0-0' }}%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" [style.width.%]="(pot.currentBalance / pot.targetAmount) * 100"></div>
            </div>
          </div>

          <div class="pot-actions">
            <div class="contribute-section">
              <input [(ngModel)]="pot.contributionAmount" type="number" placeholder="Amount" class="contribute-input">
              <button (click)="contribute(pot)" class="contribute-btn">{{ 'savings.contribute' | translate }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .savings-page { padding: 20px; }
    .savings-summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px; margin-bottom: 20px; }
    .summary-card { background: linear-gradient(135deg, #6C1B8C, #8B3A9E); color: white; padding: 20px; border-radius: 16px; text-align: center; }
    .summary-card .amount { font-size: 1.8rem; font-weight: bold; margin: 8px 0; }
    .summary-card .sub { font-size: 0.8rem; opacity: 0.8; }
    .savings-form { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 20px; }
    .savings-form h3 { margin-top: 0; margin-bottom: 15px; }
    .form-row { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
    .form-input { padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; flex: 1; min-width: 150px; }
    .form-input:focus { outline: none; border-color: #6C1B8C; }
    .checkbox-label { display: flex; align-items: center; gap: 8px; color: #555; }
    .btn-primary { padding: 10px 24px; background: linear-gradient(135deg, #6C1B8C, #8B3A9E); color: white; border: none; border-radius: 8px; cursor: pointer; }
    .savings-pots { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 16px; }
    .pot-card { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .pot-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px; }
    .pot-header h4 { margin: 0; color: #1a1a2e; }
    .pot-purpose { font-size: 0.85rem; color: #999; }
    .group-badge { padding: 2px 12px; background: #e8f5e9; color: #4CAF50; border-radius: 12px; font-size: 0.75rem; font-weight: 600; }
    .pot-progress { margin: 12px 0; }
    .progress-info { display: flex; justify-content: space-between; font-size: 0.9rem; color: #666; margin-bottom: 6px; }
    .percentage { font-weight: 600; color: #6C1B8C; }
    .progress-bar { height: 8px; background: #f0f0f0; border-radius: 4px; overflow: hidden; }
    .progress-fill { height: 100%; background: linear-gradient(90deg, #6C1B8C, #8B3A9E); transition: width 0.5s; }
    .pot-actions { margin-top: 12px; }
    .contribute-section { display: flex; gap: 8px; }
    .contribute-input { flex: 1; padding: 8px 12px; border: 1px solid #ddd; border-radius: 6px; min-width: 80px; }
    .contribute-btn { padding: 8px 16px; background: #00a86b; color: white; border: none; border-radius: 6px; cursor: pointer; }
  `]
})
export class SavingsComponent implements OnInit {
  currencySymbol = 'R';
  savingsPots: SavingsPot[] = [];
  totalSaved = 0;
  totalTarget = 0;
  overallProgress = 0;
  newPot: any = { userId: 1, name: '', purpose: '', targetAmount: 0, targetDate: '', isGroupPot: false };

  constructor(
    private userService: UserService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    const user = this.userService.getMockUser();
    this.currencySymbol = this.countryService.getCurrencySymbol(user.country);
    this.loadMockData();
  }

  loadMockData() {
    this.savingsPots = [
      { id: 1, name: 'School Fees 2027', purpose: 'Education', targetAmount: 8000, currentBalance: 3200, isGroupPot: false },
      { id: 2, name: 'Emergency Fund', purpose: 'Emergency', targetAmount: 5000, currentBalance: 1800, isGroupPot: false },
      { id: 3, name: 'Festive Stokvel', purpose: 'Savings Group', targetAmount: 3000, currentBalance: 1250, isGroupPot: true }
    ];
    this.calculateTotals();
  }

  calculateTotals() {
    this.totalSaved = this.savingsPots.reduce((sum, p) => sum + p.currentBalance, 0);
    this.totalTarget = this.savingsPots.reduce((sum, p) => sum + p.targetAmount, 0);
    this.overallProgress = Math.round((this.totalSaved / this.totalTarget) * 100);
  }

  createPot() {
    const newPot: SavingsPot = {
      id: Date.now(),
      name: this.newPot.name,
      purpose: this.newPot.purpose || 'General',
      targetAmount: this.newPot.targetAmount,
      currentBalance: 0,
      isGroupPot: this.newPot.isGroupPot || false,
      targetDate: this.newPot.targetDate
    };
    this.savingsPots.push(newPot);
    this.calculateTotals();
    this.newPot = { userId: 1, name: '', purpose: '', targetAmount: 0, targetDate: '', isGroupPot: false };
  }

  contribute(pot: SavingsPot) {
    if (!pot.contributionAmount || pot.contributionAmount <= 0) return;
    pot.currentBalance += Number(pot.contributionAmount);
    pot.contributionAmount = 0;
    this.calculateTotals();
  }
}
