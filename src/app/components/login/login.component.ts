import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormBuilder, FormGroup y Validators
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router'; // Importa el servicio Router
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Crea una variable para el formulario

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicializa el formulario en el constructor
    this.loginForm = this.fb.group({
      username: ['', Validators.required], // Campo de usuario
      password: ['', Validators.required], // Campo de contraseña
    });
  }

  ngOnInit(): void {}

  // Esta función se activa cuando el formulario es enviado
  onLogin() {
    this.authService.login(this.loginForm.value).then((res: any) => {
      console.log(res)
      if (res.success) {
        console.log("hola")
        console.log("holi")
        sessionStorage.setItem('token', res.data.username);
        sessionStorage.setItem('id', res.data.id);
        sessionStorage.setItem('nombres', res.data.firstName+" "+res.data.lastName);
        sessionStorage.setItem('email', res.data.email);
        sessionStorage.setItem('phoneNumber', res.data.phoneNumber);

        this.router.navigate(['/home']);
      }
      else{
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo',
          confirmButtonColor: '#6a1b9a',  // Color morado
          background: '#f3e5f5',  // Fondo morado claro
        });
      }
    });
  }
}
