import { Routes } from '@angular/router';
<<<<<<< HEAD
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
=======
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BillsComponent } from './pages/bills/bills.component';
import { SavingsComponent } from './pages/savings/savings.component';
import { BudgetComponent } from './pages/budget/budget.component';
<<<<<<< HEAD
import { SettingsComponent } from './pages/settings/settings.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'bills', component: BillsComponent, canActivate: [AuthGuard] },
  { path: 'savings', component: SavingsComponent, canActivate: [AuthGuard] },
  { path: 'budget', component: BudgetComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
=======

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bills', component: BillsComponent },
  { path: 'savings', component: SavingsComponent },
  { path: 'budget', component: BudgetComponent },
  { path: '**', redirectTo: '/dashboard' }
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
];
