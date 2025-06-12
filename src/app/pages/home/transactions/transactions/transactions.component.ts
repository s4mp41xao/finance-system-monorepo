import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { TransactionsService } from './transactions.service';
import { BankAccountService } from '../../bank-accounts/bank-accounts.service';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.model';

@Component({
  imports: [
    CommonModule,
    TransactionModalComponent,
    ReactiveFormsModule,
    FormsModule,
  ],
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  // Lista de empresas para o select (mock inicial)
  companies: Company[] = [];
  selectedCompanyId: number | null = null;

  // Lista de transações (mock inicial)
  transactions: any[] = [];
  bankAccounts: any[] = [];

  // Controle do modal
  showModal = false;

  constructor(
    private transactionsService: TransactionsService,
    private bankAccountsService: BankAccountService,
    private companyService: CompanyService // ADICIONE ESTA LINHA
  ) {}

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompaniesByUser().subscribe({
      next: (data) => (this.companies = data),
      error: (error) => console.error('Erro ao carregar empresas', error),
    });
  }

  onCompanyChange(companyId: number | null) {
    this.selectedCompanyId = companyId;
    if (companyId !== null) {
      this.loadBankAccounts(companyId);
      this.loadTransactions(companyId);
    } else {
      this.transactions = [];
      this.bankAccounts = [];
    }
  }

  loadBankAccounts(companyId: number) {
    this.bankAccountsService.getByCompany(companyId).subscribe((accounts) => {
      this.bankAccounts = accounts;
    });
  }

  loadTransactions(companyId: number) {
    this.transactionsService
      .getByCompany(companyId)
      .subscribe((transactions) => {
        console.log('Transações recebidas:', transactions); // Veja o que chega aqui!
        this.transactions = transactions;
      });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    if (this.selectedCompanyId) {
      this.loadTransactions(this.selectedCompanyId);
    }
  }

  editTransaction(transaction: any) {
    // Lógica para editar (abrir modal em modo edição, etc)
  }

  deleteTransaction(transaction: any) {
    if (confirm('Deseja realmente excluir esta transação?')) {
      this.transactionsService
        .delete(transaction.transactionId)
        .subscribe(() => {
          this.transactions = this.transactions.filter(
            (t) => t.transactionId !== transaction.transactionId
          );
        });
    }
  }

  getBankAccountName(bankAccountId: number): string {
    const acc = this.bankAccounts.find((acc) => acc.id == bankAccountId);
    return acc ? acc.bankName || acc.name : '';
  }

  saveTransaction(transaction: any) {
    this.transactionsService.create(transaction).subscribe({
      next: () => {
        this.closeModal();
        if (this.selectedCompanyId) {
          this.loadTransactions(this.selectedCompanyId);
        }
      },
      error: (err) => {
        // Trate o erro (exiba mensagem para o usuário)
        console.error('Erro ao salvar transação', err);
      },
    });
  }
}
