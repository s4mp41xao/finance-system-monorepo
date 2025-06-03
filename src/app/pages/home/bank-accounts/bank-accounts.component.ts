import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountService, BankAccountDTO } from './bank-accounts.service';
import { FormsModule } from '@angular/forms';
import { Company } from '../company/company.model';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-accounts.component.html',
})
export class BankAccountsComponent implements OnInit {
  private service = inject(BankAccountService);
  bankAccounts: BankAccountDTO[] = [];
  companies: Company[] = [];
  newAccount: BankAccountDTO = this.emptyAccount();
  // companyId = 1; // ajuste conforme necessário

  ngOnInit(): void {
    this.loadAccounts();
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.service.getCompanies().subscribe({
      next: (companies) => {
        this.companies = companies;
        if (companies.length > 0) {
          // this.companyId = companies[0].id;
          this.newAccount.companyId = companies[0].id;
          this.loadAccounts();
        }
      },
      error: () => console.error('Erro ao carregar empresas do usúario'),
    });
  }

  loadAccounts(): void {
    const selectedCompanyId = this.newAccount.companyId;
    this.service
      .getAll(selectedCompanyId)
      .subscribe((accounts) => (this.bankAccounts = accounts));
  }

  createAccount(): void {
    console.log('Empresa selecionada:', this.newAccount.companyId);
    this.service
      .create(this.newAccount.companyId, this.newAccount)
      .subscribe(() => {
        this.loadAccounts();
        this.newAccount = this.emptyAccount();
      });
  }

  deleteAccount(id: number): void {
    this.service.deleteAccount(id).subscribe(() => this.loadAccounts());
  }

  private emptyAccount(): BankAccountDTO {
    return {
      bankName: '',
      agency: '',
      accountNumber: '',
      accountType: 'CHECKING',
      initialBalance: 0,
      currentBalance: 0,
      companyId: null as any,
    };
  }
}
