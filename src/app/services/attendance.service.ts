import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = `${environment.host}api/menu-principal`; // URL base de la API
  private urlAtt = `${environment.host}api/attendecies/create`; // URL base de la API
  private urlHist = `${environment.host}api/attendecies/listByProfessorId`; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método para consumir el menú principal
  getMenuPrincipal(id: string): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const data = {
      professorId: id,
    };

    return this.http
      .post<any>(this.apiUrl, data, { headers })
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch((error) => {});
  }

  register(id: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    });

    const data = {
      courseId: id,
      professorId: sessionStorage.getItem("id")
    };
    console.log(data);
    return this.http
      .post<any>(this.urlAtt, data, { headers })
      .toPromise()
      .then((res: any) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        return 'ERROR';
      });
  }
  history(id: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    });

    const data = {
      professorId: id,
    };
    return this.http
      .post<any>(this.urlHist, data, { headers })
      .toPromise()
      .then((res: any) => {
        return res;
      })
      .catch((error) => {
        return 'ERROR';
      });
  }
}
