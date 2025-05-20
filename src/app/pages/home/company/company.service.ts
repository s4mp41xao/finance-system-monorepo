// src/app/company/company.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from './company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private apiUrl = 'http://localhost:8080/api/companies';

  constructor(private http: HttpClient) {}

  // private getAuthHeaders(): HttpHeaders {
  //   const token = sessionStorage.getItem('auth-token');
  //   if (!token) {
  //     throw new Error('Token not found');
  //   }

  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   });
  // }

  createCompany(payload: { name: string; cnpj: string }): Observable<Company> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    // });

    // const headers = this.getAuthHeaders();
    // console.log(this.getAuthHeaders);

    return this.http.post<Company>(this.apiUrl, payload);
  }

  getCompaniesByUser(): Observable<Company[]> {
    // const headers = this.getAuthHeaders();
    return this.http.get<Company[]>(this.apiUrl);
  }
}
