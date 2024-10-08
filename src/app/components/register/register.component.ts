import { AttendanceService } from './../../services/attendance.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Html5Qrcode,
  Html5QrcodeCameraScanConfig,
  CameraDevice,
} from 'html5-qrcode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  html5QrCode!: Html5Qrcode; // Uso del operador '!'
  qrResult: string = '';
  cameraId: string = '';
  devices: CameraDevice[] = [];
  imageName: string | null = '';
  nombres: string | null = '';
  clase: any = null;
  today: string | null = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {
    // Constructor sin parámetros
  }

  ngOnInit(): void {
    this.getCameras();
    this.imageName = sessionStorage.getItem('token'); // Cambia 'imageName' por tu clave en sessionStorage
    this.nombres = sessionStorage.getItem('nombres'); // Cambia 'nombres' por tu clave en sessionStorage
    this.route.queryParams.subscribe((params) => {
      if (params['clase']) {
        try {
          // Si existe 'clase', parsearlo si es un JSON
          this.clase = JSON.parse(params['clase']);
        } catch (e) {
          console.error('Error al parsear los query params de clase:', e);
        }
      }
    });
    const date = new Date();
    this.today = new Intl.DateTimeFormat('es-ES', { dateStyle: 'full' }).format(
      date
    );
  }
  logout() {
    sessionStorage.clear();
    window.location.reload();
  }

  ngAfterViewInit(): void {
    // Inicializar html5QrCode después de que la vista se haya cargado
    this.html5QrCode = new Html5Qrcode('reader');
  }

  getCameras() {
    Html5Qrcode.getCameras()
      .then((devices: CameraDevice[]) => {
        this.devices = devices;
        if (devices && devices.length) {
          const frontCamera = devices.find((device) =>
            device.label.toLowerCase().includes('back')
          );
          this.cameraId = frontCamera ? frontCamera.id : devices[0].id;
        }
      })
      .catch((err) => {
        console.error('No se pudieron obtener las cámaras: ', err);
      });
  }
  redirectTo(ruta: string) {
    this.router.navigate([ruta]); // Usa el parámetro "ruta" para redirigir dinámicamente
  }
  startScanner() {
    const config: Html5QrcodeCameraScanConfig = {
      fps: 10,
      qrbox: { width: 300, height: 500 },
    };

    this.html5QrCode
      .start(
        this.cameraId,
        config,
        (decodedText, decodedResult) => {
          this.qrResult = decodedText;
          if (this.qrResult.includes("Asistencia")) {
            this.attendanceService
            .register(this.clase.courseId)
            .then((res: any) => {
              if (res.success) {
                // Asistencia registrada con éxito
                Swal.fire({
                  title: 'Asistencia Registrada',
                  text: 'Tu asistencia ha sido registrada correctamente.',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#6a1b9a',
                  background: '#f3e5f5'
                });
              } else {
                // Fallo en el registro de asistencia
                Swal.fire({
                  title: 'Fallo en el Registro',
                  text: 'Hubo un error al registrar tu asistencia. Por favor, intenta de nuevo.',
                  icon: 'error',
                  confirmButtonText: 'Intentar de nuevo',
                  confirmButtonColor: '#d33',
                  background: '#ffe5e5'
                });
              }
            });
          }else{
            Swal.fire({
              title: 'QR Inválido',
              text: 'El QR escaneado no es válido para registrar asistencia.',
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo',
              confirmButtonColor: '#d33',
              background: '#ffe5e5'
            });
          }

          this.stopScanner();
        },
        (errorMessage) => {
          console.warn(`Error en el escaneo: ${errorMessage}`);
        }
      )
      .catch((err) => {
        console.error('No se pudo iniciar el escáner: ', err);
      });
  }

  stopScanner() {
    this.html5QrCode
      .stop()
      .then(() => {
        console.log('Escáner detenido.');
      })
      .catch((err) => {
        console.error('No se pudo detener el escáner: ', err);
      });
  }
}
