import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-company',
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
    private http: HttpClient,
    private toastService: ToastrService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      cnpj: ['', Validators.required],
    });
  }

  onSubmit() {
    const token = sessionStorage.getItem('auth-token');

    if (this.companyForm.valid && token) {
      const payload = this.companyForm.value;

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      this.http
        .post('http://localhost:8080/api/companies', payload, { headers })
        .subscribe({
          next: () => {
            this.toastService.success('Empresa criada com sucesso!');
            this.close();
          },
          error: () => this.toastService.error('Erro ao criar empresa'),
        });
    } else {
      console.warn('Form inválido ou token não encontrado!');
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
