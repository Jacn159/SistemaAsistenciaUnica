import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  imageName: string | null = '';
  id: string | null = '';
  nombres: string | null = '';
  email: string | null = '';
  phoneNumber: string | null = '';

  constructor() {}

  ngOnInit(): void {
    this.imageName = sessionStorage.getItem('token'); // Cambia 'imageName' por tu clave en sessionStorage
    this.id = sessionStorage.getItem('id'); // Cambia 'id' por tu clave en sessionStorage
    this.nombres = sessionStorage.getItem('nombres'); // Cambia 'nombres' por tu clave en sessionStorage
    this.email = sessionStorage.getItem('email');
    this.phoneNumber = sessionStorage.getItem('phoneNumber');
  }
  logout() {
    sessionStorage.clear();
    window.location.reload()
  }
}
