import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = sessionStorage.getItem('auth-token');

    if (authToken) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

    return false; // Impede de carregar algo nessa rota raiz
  }
}
