import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiStudentService {

  private url: string = 'https://pi1a5back.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getTicketsUser(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsUser`, {
      sub: localStorage.getItem('sub')
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
      sub: localStorage.getItem('sub'),
    });
  }
}
