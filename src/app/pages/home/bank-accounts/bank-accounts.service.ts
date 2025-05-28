import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

@Injectable({ providedIn: 'root' })
export class BankAccountService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/api/bank-accounts';

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

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
