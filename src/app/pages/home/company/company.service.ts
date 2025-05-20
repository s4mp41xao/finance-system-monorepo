// src/app/company/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  createCompany(payload: { name: string; cnpj: string }): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, payload);
  }

  getCompaniesByUser(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiUrl);
  }
}
