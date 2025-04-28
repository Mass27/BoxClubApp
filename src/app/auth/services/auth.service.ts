import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Auththen } from '../interfaces/auth-auten.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    const bodyContent = {
      nombreUsuario: username,
      contrasenalogin: password,
    };

    return this.http.post<Auththen>(
      `${this.baseUrl}/autenticacion/inicioSesion`,
      bodyContent
    );
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated based on the presence of the token in session storage
    const token = sessionStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    // Get the token from session storage
    const token = sessionStorage.getItem('token');
    return token;
  }
}
