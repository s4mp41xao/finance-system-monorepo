// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:8080/categories';

  constructor(private http: HttpClient) {}

  getAll(type?: string) {
    let url = `${this.apiUrl}/all-for-current-user`;
    if (type) {
      url += `?type=${type}`;
    }
    return this.http.get<any[]>(url);
  }

  create(category: { name: string; type: string }) {
    return this.http.post<any>(`${this.apiUrl}/create`, {
      categoryName: category.name,
      transactionType: category.type,
    });
  }
}
