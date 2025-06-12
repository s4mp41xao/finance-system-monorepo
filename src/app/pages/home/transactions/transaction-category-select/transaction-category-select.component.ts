import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';

interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

@Component({
  selector: 'app-transaction-category-select',
  templateUrl: './transaction-category-select.component.html',
  styleUrls: ['./transaction-category-select.component.css'],
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransactionCategorySelectComponent),
      multi: true,
    },
  ],
})
export class TransactionCategorySelectComponent
  implements ControlValueAccessor
{
  @Input() type: 'INCOME' | 'EXPENSE' | null = null;

  categories: Category[] = [
    { id: 1, name: 'Salário', type: 'INCOME' },
    { id: 2, name: 'Internet', type: 'EXPENSE' },
    { id: 3, name: 'Energia', type: 'EXPENSE' },
  ];

  value: number | null = null;
  disabled = false;
  creating = false;
  newCategoryName = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectCategory(id: number) {
    const category = this.categories.find((cat) => cat.id === id);
    this.value = id;
    // Emita um objeto com id e name
    this.onChange(category ? { id: category.id, name: category.name } : null);
    this.onTouched();
  }

  showCreate() {
    this.creating = true;
    this.newCategoryName = '';
  }

  createCategory() {
    if (this.newCategoryName.trim()) {
      const newId = this.categories.length + 1;
      const type = this.type || 'EXPENSE';
      this.categories.push({
        id: newId,
        name: this.newCategoryName,
        type,
      });
      this.selectCategory(newId);
      this.creating = false;
    }
  }

  cancelCreate() {
    this.creating = false;
    this.newCategoryName = '';
  }
}
