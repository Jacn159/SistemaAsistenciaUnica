import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (sessionStorage.getItem("token")) {
      return true;
    } else {
      // Redirige al login si no está autenticado
      this.router.navigate(['/login']);
      return false;
    }
  }
}
