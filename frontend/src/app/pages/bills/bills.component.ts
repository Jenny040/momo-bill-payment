import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-bills',
  standalone: true,
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
  }

  payBill(id: number) {
    const bill = this.bills.find(b => b.id === id);
    if (bill) bill.status = 'paid';
  }
}
