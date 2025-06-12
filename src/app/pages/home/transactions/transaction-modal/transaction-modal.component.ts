import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionCategorySelectComponent } from '../transaction-category-select/transaction-category-select.component';
import { BankAccountService } from '../../bank-accounts/bank-accounts.service';
import { NgIcon } from '@ng-icons/core';

@Component({
  imports: [TransactionCategorySelectComponent, ReactiveFormsModule, NgIcon],
  selector: 'app-transaction-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css'],
})
export class TransactionModalComponent implements OnInit, OnChanges {
  @Input() companyId: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<any>(); // Para emitir a transação salva

  form!: FormGroup;
  bankAccounts: any[] = [];

  @ViewChild('categorySelect')
  categorySelectComponent?: TransactionCategorySelectComponent;

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService // ADICIONE ESTA LINHA
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(0.01)]],
      date: [null, Validators.required],
      description: [''],
      type: ['EXPENSE', Validators.required],
      categoryId: [null],
      bankAccountId: [null, Validators.required],
    });

    this.loadBankAccounts();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['companyId']) {
      this.loadBankAccounts();
    }
  }

  loadBankAccounts() {
    if (this.companyId) {
      this.bankAccountService.getByCompany(this.companyId).subscribe({
        next: (accounts) => (this.bankAccounts = accounts),
        error: (err) => (this.bankAccounts = []),
      });
    } else {
      this.bankAccounts = [];
    }
  }

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    // Impede submit se a categoria está em modo de criação
    if (this.categorySelectComponent?.creating) {
      // Substitua por seu ToastService se houver
      alert('Salve a nova categoria antes de criar a transação!');
      return;
    }

    if (this.form.valid) {
      const formValue = this.form.value;
      const category = formValue.categoryId; // deve ser { id, name }
      const transaction = {
        ...formValue,
        categoryId: category?.id,
        categoryName: category?.name,
        bankAccountId: Number(formValue.bankAccountId),
        creationDate: new Date().toISOString(),
      };

      this.saved.emit(transaction);
      this.onClose();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
