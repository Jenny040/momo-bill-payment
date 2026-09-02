import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

<<<<<<< HEAD
export interface Bill {
  id: number;
  userId: string;
  provider: string;
  category: string;        // ✅ ADDED
  amount: number;
  dueDate: string;
  status: string;          // ✅ ADDED: 'PAID' | 'PENDING' | 'OVERDUE' | 'UPCOMING'
  isPaid?: boolean;
  isRecurring?: boolean;
  recurrenceInterval?: number;
  paidAt?: string | null;  // ✅ ADDED
  country?: string;
  currency?: string;
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
=======
export type BillCategory = 'ELECTRICITY' | 'WATER' | 'SCHOOL_FEES' | 'OTHER';
export type BillStatus = 'UPCOMING' | 'DUE_SOON' | 'OVERDUE' | 'PAID';

export interface Bill {
  id: number;
  userId: number;
  provider: string;
  category: BillCategory;
  amountDue: number;
  dueDate: string;
  status: BillStatus;
  paidAt?: string | null;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
export class BillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  getBills(userId: string): Observable<Bill[]> {
=======
  getBills(userId: number): Observable<Bill[]> {
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
    return this.http.get<Bill[]>(`${this.apiUrl}/bills?userId=${userId}`);
  }

  createBill(bill: Partial<Bill>): Observable<Bill> {
    return this.http.post<Bill>(`${this.apiUrl}/bills`, bill);
  }

  payBill(billId: number): Observable<Bill> {
    return this.http.post<Bill>(`${this.apiUrl}/bills/${billId}/pay`, {});
  }

<<<<<<< HEAD
  getOverdueBills(userId: string): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/bills/overdue?userId=${userId}`);
  }

  getMockBills(userId: string, country: string = 'SOUTH_AFRICA'): Bill[] {
    const mockBills: { [key: string]: Bill[] } = {
      'SOUTH_AFRICA': [
        { id: 1, userId, provider: 'DSTV Premium', category: 'OTHER', amount: 699, dueDate: '2026-09-05', status: 'PAID', paidAt: '2026-09-01T10:00:00Z', isPaid: true, isRecurring: true, recurrenceInterval: 30, country: 'SOUTH_AFRICA', currency: 'ZAR' },
        { id: 2, userId, provider: 'Eskom Prepaid', category: 'ELECTRICITY', amount: 500, dueDate: '2026-09-10', status: 'PENDING', paidAt: null, isPaid: false, isRecurring: false, country: 'SOUTH_AFRICA', currency: 'ZAR' },
        { id: 3, userId, provider: 'City of Cape Town', category: 'WATER', amount: 350, dueDate: '2026-08-28', status: 'OVERDUE', paidAt: null, isPaid: false, isRecurring: true, recurrenceInterval: 30, country: 'SOUTH_AFRICA', currency: 'ZAR' },
        { id: 4, userId, provider: 'MTN Data Bundle', category: 'OTHER', amount: 99, dueDate: '2026-09-15', status: 'PENDING', paidAt: null, isPaid: false, isRecurring: true, recurrenceInterval: 30, country: 'SOUTH_AFRICA', currency: 'ZAR' }
      ],
      'NIGERIA': [
        { id: 5, userId, provider: 'DSTV', category: 'OTHER', amount: 15000, dueDate: '2026-09-05', status: 'PAID', paidAt: '2026-09-01T10:00:00Z', isPaid: true, isRecurring: true, recurrenceInterval: 30, country: 'NIGERIA', currency: 'NGN' },
        { id: 6, userId, provider: 'Ikeja Electric', category: 'ELECTRICITY', amount: 25000, dueDate: '2026-09-10', status: 'PENDING', paidAt: null, isPaid: false, isRecurring: false, country: 'NIGERIA', currency: 'NGN' }
      ],
      'GHANA': [
        { id: 7, userId, provider: 'DSTV', category: 'OTHER', amount: 350, dueDate: '2026-09-05', status: 'PENDING', paidAt: null, isPaid: false, isRecurring: true, recurrenceInterval: 30, country: 'GHANA', currency: 'GHS' },
        { id: 8, userId, provider: 'ECG', category: 'ELECTRICITY', amount: 200, dueDate: '2026-09-10', status: 'PENDING', paidAt: null, isPaid: false, isRecurring: false, country: 'GHANA', currency: 'GHS' }
=======
  getOverdueBills(userId: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.apiUrl}/bills/overdue?userId=${userId}`);
  }

  getMockBills(userId: number, country: string = 'SOUTH_AFRICA'): Bill[] {
    const mockBills: { [key: string]: Bill[] } = {
      'SOUTH_AFRICA': [
        { id: 1, userId, provider: 'DSTV Premium', category: 'OTHER', amountDue: 699, dueDate: '2026-09-05', status: 'PAID', paidAt: '2026-09-01T10:00:00Z' },
        { id: 2, userId, provider: 'Eskom Prepaid', category: 'ELECTRICITY', amountDue: 500, dueDate: '2026-09-10', status: 'UPCOMING', paidAt: null },
        { id: 3, userId, provider: 'City of Cape Town', category: 'WATER', amountDue: 350, dueDate: '2026-08-28', status: 'OVERDUE', paidAt: null },
        { id: 4, userId, provider: 'MTN Data Bundle', category: 'OTHER', amountDue: 99, dueDate: '2026-09-15', status: 'UPCOMING', paidAt: null }
      ],
      'NIGERIA': [
        { id: 5, userId, provider: 'DSTV', category: 'OTHER', amountDue: 15000, dueDate: '2026-09-05', status: 'PAID', paidAt: '2026-09-01T10:00:00Z' },
        { id: 6, userId, provider: 'Ikeja Electric', category: 'ELECTRICITY', amountDue: 25000, dueDate: '2026-09-10', status: 'UPCOMING', paidAt: null }
      ],
      'GHANA': [
        { id: 7, userId, provider: 'DSTV', category: 'OTHER', amountDue: 350, dueDate: '2026-09-05', status: 'UPCOMING', paidAt: null },
        { id: 8, userId, provider: 'ECG', category: 'ELECTRICITY', amountDue: 200, dueDate: '2026-09-10', status: 'UPCOMING', paidAt: null }
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
      ]
    };
    return mockBills[country] || mockBills['SOUTH_AFRICA'];
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
