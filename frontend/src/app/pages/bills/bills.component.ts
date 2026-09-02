import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillService, Bill } from '../../core/services/bill.service';
import { UserService } from '../../core/services/user.service';
import { CountryService } from '../../core/services/country.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="bills-page">
      <h2>{{ 'bills.title' | translate }}</h2>

      <div class="bill-form">
        <h3>{{ 'bills.addBill' | translate }}</h3>
        <form (ngSubmit)="addBill()">
          <div class="form-row">
            <input [(ngModel)]="newBill.provider" name="provider" placeholder="Provider" required class="form-input">
            <select [(ngModel)]="newBill.category" name="category" class="form-input">
              <option value="ELECTRICITY">⚡ Electricity</option>
              <option value="WATER">💧 Water</option>
              <option value="SCHOOL_FEES">📚 School Fees</option>
              <option value="OTHER">📄 Other</option>
            </select>
          </div>
          <div class="form-row">
            <input [(ngModel)]="newBill.amountDue" name="amount" type="number" placeholder="Amount" required class="form-input">
            <input [(ngModel)]="newBill.dueDate" name="dueDate" type="date" required class="form-input">
          </div>
          <button type="submit" class="btn-primary">{{ 'bills.addBill' | translate }}</button>
        </form>
      </div>

      <div class="filters">
        <button (click)="filter = 'all'" [class.active]="filter === 'all'">All ({{ bills.length }})</button>
        <button (click)="filter = 'pending'" [class.active]="filter === 'pending'">Pending ({{ pendingBills.length }})</button>
        <button (click)="filter = 'overdue'" [class.active]="filter === 'overdue'">Overdue ({{ overdueBills.length }})</button>
        <button (click)="filter = 'paid'" [class.active]="filter === 'paid'">Paid ({{ paidBills.length }})</button>
      </div>

      <div class="bills-list">
        <div *ngFor="let bill of filteredBills" class="bill-item" [class.paid]="bill.status === 'PAID'">
          <div class="bill-info">
            <span class="bill-icon">{{ getIcon(bill.category) }}</span>
            <div class="bill-details">
              <span class="bill-provider">{{ bill.provider }}</span>
              <span class="bill-type">{{ bill.category }}</span>
            </div>
            <span class="bill-amount">{{ currencySymbol }}{{ bill.amountDue | number:'1.2-2' }}</span>
            <span class="bill-date">Due: {{ bill.dueDate | date }}</span>
            <span class="status" [class.paid]="bill.status === 'PAID'" [class.overdue]="bill.status === 'OVERDUE'">
              {{ bill.status === 'PAID' ? '✓ Paid' : (bill.status === 'OVERDUE' ? '⚠️ Overdue' : 'Pending') }}
            </span>
          </div>
          <button *ngIf="bill.status !== 'PAID'" (click)="payBill(bill.id)" class="pay-btn">{{ 'bills.payNow' | translate }}</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bills-page { padding: 20px; }
    .bill-form { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); margin-bottom: 20px; }
    .bill-form h3 { margin-top: 0; margin-bottom: 15px; }
    .form-row { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
    .form-input { padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; flex: 1; min-width: 150px; }
    .form-input:focus { outline: none; border-color: #6C1B8C; }
    .btn-primary { padding: 10px 24px; background: linear-gradient(135deg, #6C1B8C, #8B3A9E); color: white; border: none; border-radius: 8px; cursor: pointer; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
    .filters button { padding: 8px 16px; border: 1px solid #ddd; border-radius: 20px; background: white; cursor: pointer; transition: all 0.2s; }
    .filters button.active { background: #6C1B8C; color: white; border-color: #6C1B8C; }
    .bills-list { background: white; padding: 20px; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    .bill-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f0f0f0; flex-wrap: wrap; gap: 10px; }
    .bill-item:last-child { border-bottom: none; }
    .bill-item.paid { opacity: 0.6; }
    .bill-info { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; flex: 1; }
    .bill-icon { font-size: 1.5rem; }
    .bill-details { display: flex; flex-direction: column; }
    .bill-provider { font-weight: 600; color: #1a1a2e; }
    .bill-type { font-size: 0.8rem; color: #999; }
    .bill-amount { font-weight: 600; color: #6C1B8C; min-width: 80px; }
    .bill-date { color: #888; font-size: 0.85rem; }
    .status { padding: 2px 12px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: #ffd700; }
    .status.paid { background: #00a86b; color: white; }
    .status.overdue { background: #e74c3c; color: white; }
    .pay-btn { padding: 6px 16px; background: #00a86b; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .pay-btn:hover { background: #00995e; }
  `]
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  filteredBills: Bill[] = [];
  filter: string = 'all';
  currencySymbol = 'R';
  newBill: any = { userId: 1, provider: '', category: 'OTHER', amountDue: 0, dueDate: '' };

  constructor(
    private billService: BillService,
    private userService: UserService,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    const user = this.userService.getMockUser();
    this.currencySymbol = this.countryService.getCurrencySymbol(user.country);
    this.bills = this.billService.getMockBills(user.id, user.country);
    this.applyFilter();
  }

  get pendingBills() { return this.bills.filter(b => b.status !== 'PAID' && b.status !== 'OVERDUE'); }
  get overdueBills() { return this.bills.filter(b => b.status === 'OVERDUE'); }
  get paidBills() { return this.bills.filter(b => b.status === 'PAID'); }

  applyFilter() {
    if (this.filter === 'all') this.filteredBills = this.bills;
    else if (this.filter === 'pending') this.filteredBills = this.pendingBills;
    else if (this.filter === 'overdue') this.filteredBills = this.overdueBills;
    else if (this.filter === 'paid') this.filteredBills = this.paidBills;
  }

  getIcon(category: string): string {
    const icons: any = { 'ELECTRICITY': '⚡', 'WATER': '💧', 'SCHOOL_FEES': '📚', 'OTHER': '📄' };
    return icons[category] || '📄';
  }

  addBill() {
    const bill: Bill = {
      id: Date.now(),
      userId: 1,
      provider: this.newBill.provider,
      category: this.newBill.category,
      amountDue: this.newBill.amountDue,
      dueDate: this.newBill.dueDate,
      status: 'UPCOMING',
      paidAt: null
    };
    this.bills.push(bill);
    this.applyFilter();
    this.newBill = { userId: 1, provider: '', category: 'OTHER', amountDue: 0, dueDate: '' };
  }

  payBill(id: number) {
    const bill = this.bills.find(b => b.id === id);
    if (bill) {
      bill.status = 'PAID';
      bill.paidAt = new Date().toISOString();
      this.applyFilter();
    }
  }
}
