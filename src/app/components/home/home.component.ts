import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from './../../services/attendance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  imageName: string | null = '';
  id: string | null = '';
  nombres: string | null = '';
  today: string | null = '';
  clase: any | null = '';
  active: any | null = '';
  professor: { firstName: string; lastName: string; facultyName: string } = {
    firstName: '',
    lastName: '',
    facultyName: '',
  };

  schedule: any = {}; // Contendrá los cursos por día

  constructor(
    private router: Router,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.imageName = sessionStorage.getItem('token'); // Cambia 'imageName' por tu clave en sessionStorage
    this.id = sessionStorage.getItem('id'); // Cambia 'id' por tu clave en sessionStorage
    this.nombres = sessionStorage.getItem('nombres'); // Cambia 'nombres' por tu clave en sessionStorage

    // Simulación de la llamada al servicio con los datos del profesor y los cursos
    this.attendanceService.getMenuPrincipal(this.id || '').then((res: any) => {
      // Asignamos los datos del profesor y el horario
      this.professor.firstName = res.professorFirstName;
      this.professor.lastName = res.professorLastName;
      this.professor.facultyName = res.facultyName;
      this.schedule = res.dailyCourses;
    });

    const date = new Date();
    this.today = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(
      date
    );
  }
  capitalizedWord(text: string): string {
    return text
      .toLowerCase()
      .replace(/(?:^|\s|["'([{¿¡])+\S/g, (char) => char.toUpperCase());
  }

  // Función para obtener las clases de un día específico
  getClassesForDay(day: string) {
    return this.schedule[day.toUpperCase()] || []; // Buscar clases en el objeto según el día
  }

  setClase(clase: any) {
    this.clase = clase;
  }
  logout() {
    sessionStorage.clear();
    window.location.reload()
  }
  redirectTo(ruta: string) {
    if (ruta == '/register' && this.clase) {
      this.router.navigate([ruta], {
        queryParams: { clase: JSON.stringify(this.clase) },
      });
    } else {
      if (ruta != '/register') {
        this.router.navigate([ruta]); // Redirigir normalmente si no es /register
      }
    }
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.clase = '';
  }
}
