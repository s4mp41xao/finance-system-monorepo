import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { AuthGuard } from './services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { EmptyComponent } from './components/empty/empty.component';
import { AuthRedirectGuard } from './services/auth-redirect.guard';
import { ExpensesComponent } from './pages/home/expenses/expenses.component';
import { DashboardComponent } from './pages/home/dashboard/dashboard.component';
import { CompanyComponent } from './pages/home/company/company.component';
import { BankAccountsComponent } from './pages/home/bank-accounts/bank-accounts.component';
import { TransactionsComponent } from './pages/home/transactions/transactions/transactions.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'redirect',
    pathMatch: 'full',
  },
  {
    path: 'redirect',
    canActivate: [AuthRedirectGuard],
    component: EmptyComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: '',
    component: HomeComponent, // Agora HomeComponent é o layout geral
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'company', component: CompanyComponent },
      { path: 'bank-accounts', component: BankAccountsComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
