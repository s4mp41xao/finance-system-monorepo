import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private apiUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) {}

  getByCompany(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/company/${companyId}`);
  }

  create(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, transaction);
  }

  delete(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${transactionId}`);
  }
}
