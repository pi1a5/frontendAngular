import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiSupervisorService {

  private url: string = 'https://pi1a5back.herokuapp.com/';

  constructor(private http: HttpClient) { }

  // Dashboard
  getTicketsWithoutSupervisor(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsWithoutSupervisor`, {
      sub: localStorage.getItem('sub')
    });
  }

  getTicketsWithSupervisor(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsWithSupervisor`, {
      sub: localStorage.getItem('sub')
    });
  }

  getClosedTicketsWithSupervisor(): Observable<any> {
    return this.http.post(`${this.url}api/getClosedTicketsWithSupervisor`, {
      sub: localStorage.getItem('sub')
    });
  }

  // Card Modal
  feedbackTicket(id_ticket: number, feedback: string, accept: boolean): Observable<any> {
    return this.http.post(`${this.url}api/feedbackTicket`, {
      sub: localStorage.getItem('sub'),
      id_ticket: id_ticket,
      feedback: feedback,
      eAceito: accept
    });
  }

  // Chart Supervisors
  checkOrientadoresAmount(): Observable<any> {
    return this.http.post(`${this.url}api/checkOrientadoresAmount`, {
      sub: localStorage.getItem('sub'),
    });
  }
}
