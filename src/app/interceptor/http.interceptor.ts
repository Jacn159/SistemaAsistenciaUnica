import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Mostrar el modal de SweetAlert2 cuando comienza la petición
    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor, espere mientras procesamos su solicitud',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Mostrar el spinner de carga
      }
    });

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Ocultar el modal cuando la petición es exitosa
            Swal.close();
          }
        },
        (error: HttpErrorResponse) => {
          // Mostrar un error en el modal si la petición falla
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema con la petición',
          });
        }
      ),
      finalize(() => {
        // Asegurarse de cerrar el modal en cualquier caso
        Swal.close();
      })
    );
  }
}
