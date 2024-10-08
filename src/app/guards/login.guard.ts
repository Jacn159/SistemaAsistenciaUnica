import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = sessionStorage.getItem('token');

    // Si el token existe, redirige al usuario al home
    if (token) {
      this.router.navigate(['/home']);
      return false; // Evita que el usuario vaya a login
    }

    // Si no hay token, permite acceder al login
    return true;
  }
}
