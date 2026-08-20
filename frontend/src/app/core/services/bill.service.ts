import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Bill {
  id?: number;
  userId: string;
  billName: string;
  amount: number;
  dueDate: string;
  autoTopUp: boolean;
  paid?: boolean;
}

@Injectable({ providedIn: 'root' })
export class BillService {
  private base = `${environment.apiUrl}/bills`;

  constructor(private http: HttpClient) {}

  getBills(userId: string): Observable<Bill[]> {
    return this.http.get<Bill[]>(`${this.base}/${userId}`);
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.base, bill);
  }

  payBill(billId: number): Observable<Bill> {
    return this.http.patch<Bill>(`${this.base}/${billId}/pay`, {});
  }
}
