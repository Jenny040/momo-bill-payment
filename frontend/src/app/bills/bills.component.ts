import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bill, BillService } from '../core/services/bill.service';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bills.component.html',
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];
  userId = 'demo-user'; // TODO: replace with authenticated user id

  constructor(private billService: BillService) {}

  ngOnInit(): void {
    this.billService.getBills(this.userId).subscribe({
      next: (bills) => (this.bills = bills),
      error: (err) => console.error('Failed to load bills', err),
    });
  }

  pay(bill: Bill): void {
    if (!bill.id) return;
    this.billService.payBill(bill.id).subscribe((updated) => {
      this.bills = this.bills.map((b) => (b.id === updated.id ? updated : b));
    });
  }
}
