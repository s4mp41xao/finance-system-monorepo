import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../company/company.model';
import { CompanyService } from '../company/company.service';
export interface BankAccountDTO {
  id?: number;
  bankName: string;
  agency: string;
  accountNumber: string;
  accountType: 'SAVING' | 'CHECKING';
  initialBalance: number;
  currentBalance: number;
  creationDate?: string;
  companyId: number;
  companyName: string;
}

@Injectable({ providedIn: 'root' })
export class BankAccountService {
  private http = inject(HttpClient);
  private companyService = inject(CompanyService);
  private baseUrl = 'http://localhost:8080/api/bank-accounts';

  getCompanies(): Observable<Company[]> {
    return this.companyService.getCompaniesByUser();
  }

  create(companyId: number, dto: BankAccountDTO): Observable<BankAccountDTO> {
    return this.http.post<BankAccountDTO>(
      `${this.baseUrl}/company/${companyId}`,
      dto
    );
  }

  getAll(companyId: number): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(
      `${this.baseUrl}/company/${companyId}`
    );
  }

  getAccountsByUser(): Observable<BankAccountDTO[]> {
    return this.http.get<BankAccountDTO[]>(`${this.baseUrl}/company/user`);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
