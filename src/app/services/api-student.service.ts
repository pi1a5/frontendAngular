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

  getTicketsUser(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsUser`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  sendTicketInicio(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/newTicketInicio`, formData);
  }

  sendTicketAcompanhamento(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/newTicketAcompanhamento`, formData);
  }

  sendTicketFim(formData: FormData): Observable<any> {
    return this.http.post(`${this.url}api/newTicketFim`, formData);
  }

  checkIfFinalizou(): Observable<any> {
    return this.http.post(`${this.url}api/checkIfFinalizou`, {
      sub: sessionStorage.getItem('userId'),
    });
  }
}
