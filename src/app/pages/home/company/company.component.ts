import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent {
  showModal = false;
  @Output() closed = new EventEmitter<void>();
  companyForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private toastService: ToastrService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      cnpj: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const payload = this.companyForm.value;

      this.companyService.createCompany(payload).subscribe({
        next: () => {
          this.toastService.success('Empresa criada com sucesso!');
          this.close();
        },
        error: () => this.toastService.error('Erro ao criar empresa'),
      });
    } else {
      console.warn('Formulário inválido!');
    }
  }

  close() {
    this.showModal = false;
    this.closed.emit();
  }

  openModal() {
    this.showModal = true;
    this.cdr.detectChanges();
  }
}
