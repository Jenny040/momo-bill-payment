import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
<<<<<<< HEAD
import { LanguageService } from '../../core/services/language.service';

interface Bill {
  id: number;
  provider: string;
  category: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  recurring: boolean;
  icon: string;
}
=======
import { BillService, Bill } from '../../core/services/bill.service';
import { UserService } from '../../core/services/user.service';
import { CountryService } from '../../core/services/country.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb

@Component({
  selector: 'app-bills',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;padding-top:80px;padding-bottom:80px;font-family:'Poppins',sans-serif;">
      <div style="max-width:1280px;margin:0 auto;padding:0 20px;">

        <!-- Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;">Bills Management</h1>
            <p style="color:#666666;font-size:15px;margin-top:4px;">Track and pay your South African service providers</p>
          </div>
          <button (click)="showForm = !showForm" class="btn-add-bill">+ Add Bill</button>
        </div>

        <!-- Add Bill Form -->
        <div *ngIf="showForm" style="background:white;border-radius:16px;padding:24px;border:1px solid #E5E5E5;margin-bottom:24px;animation:slideDown 0.3s ease;">
          <h3 style="margin-bottom:16px;font-weight:600;font-size:18px;">Add New Bill</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <input [(ngModel)]="newBill.provider" placeholder="Provider" style="padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-size:14px;font-family:'Poppins',sans-serif;">
            <select [(ngModel)]="newBill.category" style="padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-size:14px;font-family:'Poppins',sans-serif;">
              <option value="Entertainment">Entertainment</option>
              <option value="Electricity">Electricity</option>
              <option value="Water">Water</option>
              <option value="Airtime & Data">Airtime & Data</option>
            </select>
            <input [(ngModel)]="newBill.amount" type="number" placeholder="Amount (R)" style="padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-size:14px;font-family:'Poppins',sans-serif;">
            <input [(ngModel)]="newBill.dueDate" type="date" style="padding:10px 16px;border:1px solid #E5E5E5;border-radius:10px;font-size:14px;font-family:'Poppins',sans-serif;">
          </div>
          <div style="display:flex;gap:12px;margin-top:12px;">
            <button (click)="addBill()" style="background:#FFCB05;color:black;border:none;padding:10px 24px;border-radius:10px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;">Add Bill</button>
            <button (click)="showForm = false" style="background:transparent;color:#666;border:1px solid #E5E5E5;padding:10px 24px;border-radius:10px;cursor:pointer;font-family:'Poppins',sans-serif;">Cancel</button>
          </div>
        </div>

        <!-- Summary Cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:24px;">
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #FF6B35;">
            <div style="font-size:13px;color:#666;font-weight:500;">Due This Month</div>
            <div style="font-size:24px;font-weight:700;color:#1A1A1A;">R {{ totalDue | number }}</div>
            <div style="font-size:13px;color:#FF6B35;">{{ pendingBills.length }} bills pending</div>
          </div>
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #E74C3C;">
            <div style="font-size:13px;color:#666;font-weight:500;">Overdue</div>
            <div style="font-size:24px;font-weight:700;color:#E74C3C;">R {{ totalOverdue | number }}</div>
            <div style="font-size:13px;color:#E74C3C;">{{ overdueBills.length }} bill(s) overdue</div>
          </div>
          <div style="background:white;border-radius:16px;padding:16px 20px;border:1px solid #E5E5E5;border-left:4px solid #00A86B;">
            <div style="font-size:13px;color:#666;font-weight:500;">Total Paid</div>
            <div style="font-size:24px;font-weight:700;color:#00A86B;">R {{ totalPaid | number }}</div>
            <div style="font-size:13px;color:#00A86B;">{{ paidBills.length }} bills paid</div>
          </div>
        </div>

        <!-- Tabs -->
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px;">
          <button *ngFor="let tab of tabs" (click)="setActiveTab(tab.id)" class="tab-btn" [class.tab-active]="activeTab === tab.id">
            {{ tab.label }} <span class="tab-count" [class.tab-count-active]="activeTab === tab.id">{{ tab.count }}</span>
          </button>
        </div>

        <!-- Bills Table -->
        <div style="background:white;border-radius:16px;border:1px solid #E5E5E5;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
          <!-- Desktop Table Header -->
          <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:12px;padding:12px 20px;background:#F7F7F7;border-bottom:2px solid #E5E5E5;font-size:12px;font-weight:600;color:#666;text-transform:uppercase;letter-spacing:0.5px;">
            <span>Provider</span>
            <span>Amount</span>
            <span>Due Date</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          <!-- Bills Rows -->
          <div *ngFor="let bill of filteredBills" style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1fr;gap:12px;padding:14px 20px;border-bottom:1px solid #F7F7F7;align-items:center;transition:all 0.3s;" class="bill-row">
            <!-- Provider -->
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:24px;">{{ bill.icon }}</span>
              <div>
                <div style="font-weight:500;font-size:14px;color:#1A1A1A;">{{ bill.provider }}</div>
                <div style="font-size:12px;color:#999;">
                  {{ bill.category }}<span *ngIf="bill.recurring" style="margin-left:4px;">· Recurring</span>
                </div>
              </div>
            </div>

            <!-- Amount -->
            <div style="font-weight:600;font-size:15px;color:#1A1A1A;">R {{ bill.amount | number }}</div>

            <!-- Due Date -->
            <div style="color:#666;font-size:14px;">{{ bill.dueDate | date:'d MMM yyyy' }}</div>

            <!-- Status -->
            <div>
              <span class="status-badge" [class.status-paid]="bill.status === 'paid'" [class.status-pending]="bill.status === 'pending'" [class.status-overdue]="bill.status === 'overdue'">
                {{ bill.status }}
              </span>
            </div>

            <!-- Action -->
            <div>
              <button *ngIf="bill.status !== 'paid'" (click)="payBill(bill.id)" class="btn-pay-now">Pay Now</button>
              <span *ngIf="bill.status === 'paid'" style="color:#00A86B;font-size:14px;font-weight:600;">✓ Done</span>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="filteredBills.length === 0" style="padding:48px 20px;text-align:center;color:#999;">
            <div style="font-size:48px;margin-bottom:12px;">🎉</div>
            <div style="font-weight:500;">No bills in this category</div>
            <div style="font-size:14px;margin-top:4px;">All caught up!</div>
          </div>
        </div>
      </div>
    </div>

    <style>
      @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .btn-add-bill {
        background: #FFCB05;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
        font-family: 'Poppins', sans-serif;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .btn-add-bill:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 16px rgba(255,203,5,0.3);
      }

      .tab-btn {
        padding: 8px 20px;
        border-radius: 9999px;
        border: 1px solid #E5E5E5;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Poppins', sans-serif;
        background: white;
        color: #666;
      }
      .tab-btn:hover {
        border-color: #FFCB05;
      }
      .tab-active {
        background: #FFCB05;
        color: black;
        border-color: #FFCB05;
      }
      .tab-count {
        background: #F7F7F7;
        padding: 2px 8px;
        border-radius: 9999px;
        font-size: 11px;
        margin-left: 4px;
        font-weight: 600;
      }
      .tab-count-active {
        background: rgba(0,0,0,0.1);
      }

      .bill-row:hover {
        background: #F7F7F7;
      }

      .status-badge {
        padding: 4px 12px;
        border-radius: 9999px;
        font-size: 12px;
        font-weight: 600;
        display: inline-block;
      }
      .status-paid {
        background: #EDFAF4;
        color: #00A86B;
      }
      .status-pending {
        background: #FFFBEB;
        color: #B8860B;
      }
      .status-overdue {
        background: #FEF2F2;
        color: #E74C3C;
      }

      .btn-pay-now {
        background: #FFCB05;
        color: black;
        border: none;
        padding: 6px 16px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 12px;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Poppins', sans-serif;
      }
      .btn-pay-now:hover {
        transform: scale(1.05);
        box-shadow: 0 2px 12px rgba(255,203,5,0.3);
      }

      @media (max-width: 768px) {
        .bill-row {
          grid-template-columns: 1fr !important;
          gap: 8px !important;
          padding: 16px 20px !important;
          border-bottom: 1px solid #E5E5E5 !important;
        }
        .desktop-header {
          display: none !important;
        }
      }
    </style>
  `,
  styles: []
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [
    { id: 1, provider: 'DSTV Premium', category: 'Entertainment', amount: 699, dueDate: '2026-09-05', status: 'paid', recurring: true, icon: '📺' },
    { id: 2, provider: 'Eskom Prepaid', category: 'Electricity', amount: 500, dueDate: '2026-09-10', status: 'pending', recurring: false, icon: '⚡' },
    { id: 3, provider: 'City of Cape Town Water', category: 'Water', amount: 350, dueDate: '2026-08-28', status: 'overdue', recurring: true, icon: '💧' },
    { id: 4, provider: 'MTN Data Bundle', category: 'Airtime & Data', amount: 99, dueDate: '2026-09-15', status: 'pending', recurring: true, icon: '📱' },
    { id: 5, provider: 'Netflix SA', category: 'Entertainment', amount: 199, dueDate: '2026-09-20', status: 'pending', recurring: true, icon: '🎬' },
    { id: 6, provider: 'Vodacom Airtime', category: 'Airtime & Data', amount: 50, dueDate: '2026-08-20', status: 'paid', recurring: false, icon: '📞' }
  ];

  showForm = false;
  activeTab: 'all' | 'pending' | 'paid' | 'overdue' = 'all';
  newBill: any = { provider: '', category: 'Entertainment', amount: 0, dueDate: '', recurring: false };

  constructor(private languageService: LanguageService) {}

  ngOnInit() {}

  get pendingBills() { return this.bills.filter(b => b.status === 'pending'); }
  get overdueBills() { return this.bills.filter(b => b.status === 'overdue'); }
  get paidBills() { return this.bills.filter(b => b.status === 'paid'); }
  get totalDue() { return this.pendingBills.reduce((s, b) => s + b.amount, 0); }
  get totalOverdue() { return this.overdueBills.reduce((s, b) => s + b.amount, 0); }
  get totalPaid() { return this.paidBills.reduce((s, b) => s + b.amount, 0); }

  get filteredBills() {
    if (this.activeTab === 'all') return this.bills;
    return this.bills.filter(b => b.status === this.activeTab);
  }

  get tabs() {
    return [
      { id: 'all', label: 'All', count: this.bills.length },
      { id: 'pending', label: 'Pending', count: this.pendingBills.length },
      { id: 'overdue', label: 'Overdue', count: this.overdueBills.length },
      { id: 'paid', label: 'Paid', count: this.paidBills.length }
    ];
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId as 'all' | 'pending' | 'paid' | 'overdue';
  }

  t(key: string): string {
    return this.languageService.get(key);
  }

  addBill() {
    if (!this.newBill.provider || !this.newBill.amount || !this.newBill.dueDate) return;
    this.bills.push({
      id: Date.now(),
      provider: this.newBill.provider,
      category: this.newBill.category,
      amount: this.newBill.amount,
      dueDate: this.newBill.dueDate,
      status: 'pending',
      recurring: this.newBill.recurring || false,
      icon: '📄'
    });
    this.newBill = { provider: '', category: 'Entertainment', amount: 0, dueDate: '', recurring: false };
    this.showForm = false;
=======
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
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
  }

  payBill(id: number) {
    const bill = this.bills.find(b => b.id === id);
<<<<<<< HEAD
    if (bill) bill.status = 'paid';
=======
    if (bill) {
      bill.status = 'PAID';
      bill.paidAt = new Date().toISOString();
      this.applyFilter();
    }
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
  }
}
