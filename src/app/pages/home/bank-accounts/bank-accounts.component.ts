import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountService, BankAccountDTO } from './bank-accounts.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-accounts.component.html',
})
export class BankAccountsComponent implements OnInit {
  private service = inject(BankAccountService);
  bankAccounts: BankAccountDTO[] = [];
  newAccount: BankAccountDTO = this.emptyAccount();
  companyId = 1; // ajuste conforme necessário

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.service
      .getAll(this.companyId)
      .subscribe((accounts) => (this.bankAccounts = accounts));
  }

  createAccount(): void {
    this.service.create(this.companyId, this.newAccount).subscribe(() => {
      this.loadAccounts();
      this.newAccount = this.emptyAccount();
    });
  }

  deleteAccount(id: number): void {
    this.service.delete(id).subscribe(() => this.loadAccounts());
  }

  private emptyAccount(): BankAccountDTO {
    return {
      bankName: '',
      agency: '',
      accountNumber: '',
      accountType: 'CHECKING',
      initialBalance: 0,
      currentBalance: 0,
      companyId: this.companyId,
    };
  }
}
