/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiStudentService {
  private url: string = this.api.getUrl();

  public pendingTicket: Object = undefined;

  constructor(private http: HttpClient, private api: ApiService) { }

  getTicketsUser(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsUser`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  sendTicket(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/newTicket`, formData);
  }

  newInternships(processId: number, hours: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/createNewEstagio`, {
      idProcesso: processId,
      cargaHoraria: hours,
      formData,
    });
  }

  checkIfFinalizou(): Observable<any> {
    return this.http.post(`${this.url}api/checkIfFinalizou`, {
      sub: sessionStorage.getItem('userId'),
    });
  }
}
