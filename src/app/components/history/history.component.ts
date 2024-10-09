import { AttendanceService } from './../../services/attendance.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  imageName: string | null | undefined;
  id: string | null | undefined;
  nombres: string | null | undefined;
  historialAsistencia: any;
  constructor(
    private router: Router,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.imageName = sessionStorage.getItem('token'); // Cambia 'imageName' por tu clave en sessionStorage
    this.id = sessionStorage.getItem('id'); // Cambia 'id' por tu clave en sessionStorage
    this.nombres = sessionStorage.getItem('nombres'); // Cambia 'nombres' por tu clave en sessionStorage
    this.attendanceService.history(this.id).then((res: any) => {
      if (res.success) {
        console.log(res.data);
        this.historialAsistencia = res.data;
      }
    });
  }
exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(
      this.historialAsistencia.map((asistencia :any, index:any) => ({
        '#': index + 1,
        'ID Horario': asistencia.scheduleId,
        'Nombre del Curso': asistencia.courseName,
        'Hora de Inicio': asistencia.startTime,
        'Presente': asistencia.isPresent ? 'Presente' : 'Tardanza'
      }))
    );
    const workbook = { Sheets: { 'Historial': worksheet }, SheetNames: ['Historial'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Descargar el archivo
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'historial_asistencia.xlsx');
  }
  logout() {
    sessionStorage.clear();
    window.location.reload();
  }
  redirectTo(ruta: string) {
    this.router.navigate([ruta]); // Usa el parámetro "ruta" para redirigir dinámicamente
  }
}
