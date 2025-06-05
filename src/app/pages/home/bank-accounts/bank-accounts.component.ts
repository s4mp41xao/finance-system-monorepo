import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountService, BankAccountDTO } from './bank-accounts.service';
import { CompanyService } from '../company/company.service';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Company } from '../company/company.model';
import { NgIcon } from '@ng-icons/core';
import { HoverIconButtonComponent } from '../../../components/hover-icon-button/hover-icon-button.component';

@Component({
  selector: 'app-bank-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIcon,
    HoverIconButtonComponent,
  ],
  templateUrl: './bank-accounts.component.html',
  styleUrl: './bank-accounts.component.css',
})
export class BankAccountsComponent implements OnInit {
  private bankAccountService = inject(BankAccountService);
  private companyService = inject(CompanyService);
  private fb = inject(FormBuilder);

  bankAccounts: BankAccountDTO[] = [];
  companies: Company[] = [];
  newAccount: BankAccountDTO = this.emptyAccount();
  showModal = false;
  bankAccountForm: FormGroup;

  constructor(private cdr: ChangeDetectorRef) {
    this.bankAccountForm = this.fb.group({
      bankName: ['', Validators.required],
      agency: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['CHECKING', Validators.required],
      initialBalance: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
    this.loadCompanies();
  }

  loadCompanies(): void {
    this.bankAccountService.getCompanies().subscribe({
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
    this.bankAccountService
      .getAll(selectedCompanyId)
      .subscribe((accounts) => (this.bankAccounts = accounts));
  }

  createAccount(): void {
    // console.log('Empresa selecionada:', this.newAccount.companyId);
    this.bankAccountService
      .create(this.newAccount.companyId, this.newAccount)
      .subscribe(() => {
        this.loadAccounts();
        this.newAccount = this.emptyAccount();
      });
  }

  deleteAccount(id: number): void {
    this.bankAccountService
      .deleteAccount(id)
      .subscribe(() => this.loadAccounts());
  }

  close(): void {
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;
    this.cdr.detectChanges();
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
