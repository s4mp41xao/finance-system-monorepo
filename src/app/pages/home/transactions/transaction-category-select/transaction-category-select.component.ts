import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { CategoryService } from './category.service';

interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
}

@Component({
  selector: 'app-transaction-category-select',
  templateUrl: './transaction-category-select.component.html',
  styleUrls: ['./transaction-category-select.component.css'],
  imports: [FormsModule, NgIcon],
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

  categories: Category[] = [];

  value: number | null = null;
  disabled = false;
  creating = false;
  newCategoryName = '';

  onChange = (value: any) => {};
  onTouched = () => {};

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll(this.type ?? undefined).subscribe((cats) => {
      this.categories = cats.map((cat) => ({
        id: cat.categoryId,
        name: cat.categoryName,
        type: cat.transactionType,
      }));
    });
  }

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Se estiver criando e o clique não foi dentro do input-group, cancela
    if (this.creating) {
      const target = event.target as HTMLElement;
      if (!target.closest('.category-input-group')) {
        this.cancelCreate();
      }
    }
  }

  showCreate() {
    this.creating = true;
    setTimeout(() => {
      const input = document.querySelector(
        '.category-input'
      ) as HTMLInputElement;
      if (input) input.focus();
    });
  }

  createCategory() {
    if (this.newCategoryName.trim()) {
      const exists = this.categories.some(
        (cat) =>
          cat.name.trim().toLowerCase() ===
          this.newCategoryName.trim().toLowerCase()
      );
      if (exists) {
        alert('Já existe uma categoria com esse nome!');
        return;
      }
      const type = this.type || 'EXPENSE';
      this.categoryService
        .create({ name: this.newCategoryName, type })
        .subscribe((createdCategory) => {
          // Após criar, recarregue as categorias e só então selecione a nova
          this.loadCategoriesAndSelect(createdCategory);
          this.creating = false;
          this.newCategoryName = '';
        });
    }
  }

  cancelCreate() {
    this.creating = false;
    this.newCategoryName = '';
  }

  loadCategoriesAndSelect(createdCategory: any) {
    this.categoryService.getAll(this.type ?? undefined).subscribe((cats) => {
      this.categories = cats.map((cat) => ({
        id: cat.categoryId,
        name: cat.categoryName,
        type: cat.transactionType,
      }));
      // Agora que a lista está atualizada, selecione a nova categoria
      this.value = createdCategory.categoryId;
      this.onChange({
        id: createdCategory.categoryId,
        name: createdCategory.categoryName,
      });
    });
  }
}
