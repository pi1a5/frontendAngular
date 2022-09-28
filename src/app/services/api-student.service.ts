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

  constructor(private http: HttpClient, private api: ApiService) { }

  // getTicketsUser(): Observable<any> {
  //   return this.http.post(`${this.url}api/getTicketsUser`, {
  //     sub: sessionStorage.getItem('userId'),
  //   });
  // }

  // checkIfFinalizou(): Observable<any> {
  //   return this.http.post(`${this.url}api/checkIfFinalizou`, {
  //     sub: sessionStorage.getItem('userId'),
  //   });
  // }

  getClosedTickets(): Observable<any> {
    return this.http.post(`${this.url}api/getClosedTickets`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getPendingTicket(): Observable<any> {
    return this.http.post(`${this.url}api/getPendingTicket`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  deletePendingTicket(ticketId: number): Observable<any> {
    return this.http.post(`${this.url}api/deletePendingTicket`, {
      idTicket: ticketId,
      sub: sessionStorage.getItem('userId'),
    });
  }

  sendTicket(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/newTicket`, formData);
  }

  newInternship(processId: number, hours: number): Observable<any> {
    return this.http.post(`${this.url}api/createNewEstagio`, {
      idProcesso: processId,
      cargaHoraria: hours,
      sub: sessionStorage.getItem('userId'),
    });
  }

  checkIfHasInternship(): Observable<any> {
    return this.http.post(`${this.url}api/checkIfHasEstagio`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  checkIfEnded(): Observable<any> {
    return this.http.post(`${this.url}api/checkIfEnded`, {
      sub: sessionStorage.getItem('userId'),
    });
  }
}
