import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
import { Company } from './company.model';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIcon],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent implements OnInit {
  isHovering = false;
  companies: Company[] = [];
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

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.getCompaniesByUser().subscribe({
      next: (data) => (this.companies = data),
      error: (error) => console.error('Erro ao carregar empresas', error),
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const payload = this.companyForm.value;

      this.companyService.createCompany(payload).subscribe({
        next: () => {
          this.toastService.success('Empresa criada com sucesso!');
          this.loadCompanies();
          this.companyForm.reset();
          this.close();
        },
        error: () => this.toastService.error('Erro ao criar empresa'),
      });
    } else {
      console.warn('Formulário inválido!');
    }
  }

  deleteCompany(id: number) {
    if (confirm('Tem certeza que deseja excluir esta empresa?')) {
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          this.toastService.success('Empresa excluída com sucesso!');
          this.loadCompanies(); // Recarrega a lista após exclusão
        },
        error: () => this.toastService.error('Erro ao excluir empresa'),
      });
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
