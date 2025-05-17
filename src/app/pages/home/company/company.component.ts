import { Component, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css',
})
export class CompanyComponent {
  showModal = false;
  @Output() closed = new EventEmitter<void>();
  companyForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      CNPJ: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const payload = this.companyForm.value;
      this.http.post('/api/companies', payload).subscribe(() => {
        this.close();
      });
    }
  }

  close() {
    this.closed.emit();
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;
  }
}
