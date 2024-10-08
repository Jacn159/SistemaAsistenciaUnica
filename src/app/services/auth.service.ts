import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'api/users/login'; // URL base de la API
  private apiUrl = `${environment.host}api/menu-principal`; // URL base de la API
  private isLoggedIn = false; // Estado de inicio de sesión

  constructor(private http: HttpClient) {}



  login(form: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    });

    const data = {
      email: form.username,
      password: form.password,
    };
    console.log(data);
    return this.http
      .post<any>(`${environment.host}${this.loginUrl}`, data, { headers })
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch((error) => {
        return "ERROR"
      });
  }

  // Simula el cierre de sesión
  logout() {
    this.isLoggedIn = false;
  }

  // Verifica si el usuario está logueado
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
