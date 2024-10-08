import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // Solo acceso con guard
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] }, // Solo acceso con guard
  { path: 'profile', component: PerfilComponent, canActivate: [AuthGuard] }, // Solo acceso con guard
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard] }, // Solo acceso con guard

  { path: '**', redirectTo: '/login' } // Redirigir a login cualquier ruta no válida
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
