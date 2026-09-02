import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../core/services/language.service';

interface Pot {
  id: number;
  name: string;
  purpose: string;
  saved: number;
  target: number;
  targetDate: string;
  isStokvel: boolean;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;padding-top:80px;padding-bottom:80px;">
      <div style="max-width:1280px;margin:0 auto;padding:0 20px;">

        <!-- Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
          <div>
            <h1 style="font-size:28px;font-weight:700;color:#1A1A1A;">{{ t('savings.title') }}</h1>
            <p style="color:#666666;font-size:15px;margin-top:4px;">Save for what matters most</p>
          </div>
          <button (click)="showCreateForm = true" class="btn-new-pot">+ New Pot</button>
        </div>

        <!-- Stats Banner -->
        <div style="background:black;border-radius:16px;padding:24px;margin-bottom:24px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:24px;">
          <div>
            <div style="font-size:12px;color:#FFCB05;opacity:0.6;font-weight:500;text-transform:uppercase;">Total Saved</div>
            <div style="font-size:30px;font-weight:700;color:#FFCB05;">R {{ totalSaved | number }}</div>
            <div style="font-size:14px;color:rgba(255,255,255,0.5);">{{ pots.length }} pots</div>
          </div>
          <div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);font-weight:500;text-transform:uppercase;">Target</div>
            <div style="font-size:30px;font-weight:700;color:white;">R {{ totalTarget | number }}</div>
            <div style="font-size:14px;color:rgba(255,255,255,0.5);">combined goal</div>
          </div>
          <div>
            <div style="font-size:12px;color:rgba(255,255,255,0.4);font-weight:500;text-transform:uppercase;">Progress</div>
            <div style="width:100%;background:rgba(255,255,255,0.1);border-radius:9999px;height:12px;margin-bottom:8px;">
              <div style="width:{{ overallProgress }}%;background:#FFCB05;height:12px;border-radius:9999px;transition:width 1s ease;"></div>
            </div>
            <div style="font-weight:700;font-size:20px;color:#FFCB05;">{{ overallProgress }}%</div>
          </div>
        </div>

        <!-- Pots Grid -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;">
          <div *ngFor="let pot of pots" class="pot-card">
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;">
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:{{ pot.color }}20;">{{ pot.icon }}</div>
                <div>
                  <div style="font-weight:600;font-size:15px;">{{ pot.name }}</div>
                  <div style="font-size:12px;color:#999;">{{ pot.purpose }}<span *ngIf="pot.isStokvel" style="margin-left:6px;background:#FF6B35;color:white;padding:0 8px;border-radius:9999px;font-size:10px;">Stokvel</span></div>
                </div>
              </div>
              <div style="font-weight:700;font-size:18px;">{{ (pot.saved / pot.target * 100) | number:'1.0-0' }}%</div>
            </div>
            <div style="width:100%;background:#F7F7F7;border-radius:9999px;height:8px;margin-bottom:12px;">
              <div style="width:{{ (pot.saved / pot.target * 100) }}%;background:{{ pot.color }};height:8px;border-radius:9999px;transition:width 1s ease;"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:13px;color:#666;margin-bottom:12px;">
              <span><span style="font-weight:600;color:#1A1A1A;">R {{ pot.saved | number }}</span> saved</span>
              <span>R {{ (pot.target - pot.saved) | number }} to go</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;color:#999;margin-bottom:12px;">
              <span>Target: {{ pot.targetDate | date:'d MMM yyyy' }}</span>
              <span [style.color]="daysLeft(pot.targetDate) < 60 ? '#FF6B35' : '#999'">{{ daysLeft(pot.targetDate) > 0 ? daysLeft(pot.targetDate) + ' days left' : 'Overdue' }}</span>
            </div>
            <button (click)="openContribute(pot.id)" class="btn-contribute" [style.background]="pot.color" [style.color]="pot.color === '#FFCB05' ? 'black' : 'white'">Contribute</button>
          </div>
        </div>

        <!-- Create Pot Modal -->
        <div *ngIf="showCreateForm" style="position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;">
          <div style="background:white;border-radius:24px;padding:32px;max-width:440px;width:100%;animation:slideUp 0.3s ease;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
              <h2 style="font-weight:700;font-size:20px;">Create Savings Pot</h2>
              <button (click)="showCreateForm = false" style="background:transparent;border:none;font-size:24px;cursor:pointer;">✕</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:16px;">
              <input [(ngModel)]="newPot.name" placeholder="Pot Name" style="padding:12px 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:14px;font-family:'Poppins',sans-serif;">
              <select [(ngModel)]="newPot.purpose" style="padding:12px 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:14px;font-family:'Poppins',sans-serif;">
                <option *ngFor="let p of purposes" [value]="p">{{ p }}</option>
              </select>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <input [(ngModel)]="newPot.target" type="number" placeholder="Target (R)" style="padding:12px 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:14px;font-family:'Poppins',sans-serif;">
                <input [(ngModel)]="newPot.targetDate" type="date" style="padding:12px 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:14px;font-family:'Poppins',sans-serif;">
              </div>
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <div><div style="font-weight:500;">Group / Stokvel</div><div style="font-size:12px;color:#666;">Shared savings group</div></div>
                <button (click)="newPot.isStokvel = !newPot.isStokvel" style="position:relative;display:inline-block;width:44px;height:24px;border-radius:9999px;border:none;cursor:pointer;transition:all 0.3s;background:{{ newPot.isStokvel ? '#FFCB05' : '#E5E5E5' }};">
                  <span style="position:absolute;top:2px;left:{{ newPot.isStokvel ? '22px' : '2px' }};width:20px;height:20px;background:white;border-radius:50%;transition:all 0.3s;"></span>
                </button>
              </div>
              <button (click)="createPot()" class="btn-create-pot">Create Pot</button>
            </div>
          </div>
        </div>

        <!-- Contribute Modal -->
        <div *ngIf="contributeId !== null" style="position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,0.4);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;padding:20px;">
          <div style="background:white;border-radius:24px;padding:32px;max-width:380px;width:100%;animation:slideUp 0.3s ease;">
            <h2 style="font-weight:700;font-size:18px;margin-bottom:4px;">Contribute to {{ selectedPot?.name }}</h2>
            <p style="font-size:14px;color:#666;margin-bottom:20px;">Amount will be deducted from your MoMo wallet</p>
            <label style="font-size:12px;font-weight:600;color:#1A1A1A;text-transform:uppercase;display:block;margin-bottom:4px;">Amount (R)</label>
            <input [(ngModel)]="contributeAmount" type="number" placeholder="100" style="width:100%;padding:12px 16px;border:1px solid #E5E5E5;border-radius:12px;font-size:14px;margin-bottom:16px;font-family:'Poppins',sans-serif;">
            <div style="display:flex;gap:12px;">
              <button (click)="contributeId = null" style="flex:1;padding:12px;border:1px solid #E5E5E5;border-radius:12px;background:transparent;cursor:pointer;font-weight:500;font-family:'Poppins',sans-serif;">Cancel</button>
              <button (click)="addContribution()" style="flex:1;padding:12px;background:#FFCB05;color:black;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .btn-new-pot {
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
      }
      .btn-new-pot:hover {
        transform: scale(1.05);
      }
      .pot-card {
        background: white;
        border-radius: 16px;
        padding: 20px;
        border: 1px solid #E5E5E5;
        transition: all 0.3s;
      }
      .pot-card:hover {
        box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        transform: translateY(-2px);
      }
      .btn-contribute {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Poppins', sans-serif;
      }
      .btn-contribute:hover {
        transform: scale(1.02);
      }
      .btn-create-pot {
        background: #FFCB05;
        color: black;
        border: none;
        padding: 14px;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        font-size: 16px;
        font-family: 'Poppins', sans-serif;
        transition: all 0.3s;
      }
      .btn-create-pot:hover {
        transform: scale(1.02);
      }
    </style>
  `,
  styles: []
})
export class SavingsComponent implements OnInit {
  pots: Pot[] = [
    { id: 1, name: 'School Fees 2027', purpose: 'Education', saved: 3200, target: 8000, targetDate: '2027-01-31', isStokvel: false, color: '#FFCB05', icon: '🎓' },
    { id: 2, name: 'Emergency Fund', purpose: 'Emergency', saved: 1800, target: 5000, targetDate: '2026-12-31', isStokvel: false, color: '#00A86B', icon: '🛡️' },
    { id: 3, name: 'Festive Stokvel', purpose: 'Savings Group', saved: 1250, target: 3000, targetDate: '2026-12-01', isStokvel: true, color: '#FF6B35', icon: '🎉' }
  ];

  showCreateForm = false;
  contributeId: number | null = null;
  contributeAmount = 0;
  newPot: any = { name: '', purpose: 'Education', target: 0, targetDate: '', isStokvel: false };
  purposes = ['Education', 'Emergency', 'Holiday', 'Car', 'Home', 'Medical', 'Savings Group', 'Other'];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {}

  get totalSaved() { return this.pots.reduce((s, p) => s + p.saved, 0); }
  get totalTarget() { return this.pots.reduce((s, p) => s + p.target, 0); }
  get overallProgress() { return Math.round((this.totalSaved / this.totalTarget) * 100); }
  get selectedPot() { return this.pots.find(p => p.id === this.contributeId); }

  t(key: string): string { return this.languageService.get(key); }

  daysLeft(date: string): number {
    return Math.ceil((new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  }

  openContribute(id: number) { this.contributeId = id; this.contributeAmount = 0; }

  createPot() {
    if (!this.newPot.name || !this.newPot.target) return;
    const colors = ['#FFCB05', '#00A86B', '#FF6B35', '#0077B6', '#9333EA'];
    const icons = ['💰', '🏡', '🚗', '✈️', '🎯'];
    this.pots.push({
      id: Date.now(),
      name: this.newPot.name,
      purpose: this.newPot.purpose,
      saved: 0,
      target: this.newPot.target,
      targetDate: this.newPot.targetDate || '2027-12-31',
      isStokvel: this.newPot.isStokvel,
      color: colors[this.pots.length % colors.length],
      icon: icons[this.pots.length % icons.length]
    });
    this.newPot = { name: '', purpose: 'Education', target: 0, targetDate: '', isStokvel: false };
    this.showCreateForm = false;
  }

  addContribution() {
    if (!this.contributeAmount || this.contributeId === null) return;
    const pot = this.pots.find(p => p.id === this.contributeId);
    if (pot) { pot.saved = Math.min(pot.saved + this.contributeAmount, pot.target); }
    this.contributeId = null;
    this.contributeAmount = 0;
  }
}
