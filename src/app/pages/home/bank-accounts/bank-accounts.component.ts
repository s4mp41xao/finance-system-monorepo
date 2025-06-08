import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

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

  // ngAfterViewInit(): void {
  //   this.cdr.detectChanges();
  // }

  bankAccounts: BankAccountDTO[] = [];
  companies: Company[] = [];
  showModal = false;
  @Output() closed = new EventEmitter<void>();
  bankAccountForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService
  ) {
    this.bankAccountForm = this.fb.group({
      companyId: [null, Validators.required],
      bankName: ['', Validators.required],
      agency: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['CHECKING', Validators.required],
      initialBalance: [0, [Validators.required, Validators.min(0)]],
      currentBalance: [0, [Validators.required, Validators.min(0)]],
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
          this.bankAccountForm.get('companyId')?.setValue(companies[0].id);
          this.loadAccounts();
        }
      },
      error: () => console.error('Erro ao carregar empresas do usúario'),
    });
  }

  loadAccounts(): void {
    const selectedCompanyId = this.bankAccountForm.get('companyId')?.value;
    if (selectedCompanyId) {
      this.bankAccountService
        .getAll(selectedCompanyId)
        .subscribe((accounts) => (this.bankAccounts = accounts));
    }
  }

  createAccount(): void {
    if (this.bankAccountForm.valid) {
      const formValue = this.bankAccountForm.value;

      this.bankAccountService.create(formValue.companyId, formValue).subscribe({
        next: () => {
          this.toastService.success('Conta bancária criada com sucesso!');
          this.cdr.detectChanges();
          // Reset the form and reload accounts
          this.loadAccounts();
          this.bankAccountForm.reset({
            bankName: '',
            agency: '',
            accountNumber: '',
            accountType: 'CHECKING',
            initialBalance: 0,
            currentBalance: 0,
            companyId: null,
          });
          this.showModal = false;
        },
        error: () => this.toastService.error('Erro ao criar conta bancária'),
      });
    } else {
      this.bankAccountForm.markAllAsTouched();
    }
  }

  deleteAccount(id: number) {
    if (confirm('Tem certeza que deseja excluir esta conta bancária?')) {
      this.bankAccountService.deleteAccount(id).subscribe({
        next: () => {
          this.toastService.success('Conta excluída com sucesso!');
          this.bankAccounts = this.bankAccounts.filter((acc) => acc.id !== id);
          this.cdr.detectChanges();
        },
        error: () => this.toastService.error('Erro ao excluir conta bancária'),
      });
    }
  }

  // getCompanyName(companyId: number): string {
  //   const company = this.companies?.find((c: any) => c.id === companyId);
  //   return company ? company.name : '';
  // }

  close(): void {
    this.showModal = false;
    this.closed.emit();
  }

  openModal() {
    this.loadCompanies();
    this.showModal = true;
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
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
      companyName: '',
    };
  }
}
