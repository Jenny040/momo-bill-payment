import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BillsComponent } from './pages/bills/bills.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { BudgetComponent } from './pages/budget/budget.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'savings', component: SavingsComponent },
  { path: 'budget', component: BudgetComponent },
  { path: '**', redirectTo: '/dashboard' }
];
