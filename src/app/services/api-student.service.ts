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

  sendTicketInicio(corpo_texto: string, data_limite: string, tce: string, pa: string): Observable<any> {
    return this.http.post(`${this.url}api/newTicketInicio`, {
      corpo_texto: corpo_texto,
      data_limite: data_limite,
      sub: localStorage.getItem('sub'),
      tce: tce,
      pa: pa,
      eProfessor: false
    });
  }

  sendTicketAcompanhamento(corpo_texto: string, data_limite: string, doc: string): Observable<any> {
    return this.http.post(`${this.url}api/newTicketAcompanhamento`, {
      corpo_texto: corpo_texto,
      data_limite: data_limite,
      sub: localStorage.getItem('sub'),
      doc: doc,
      eProfessor: false
    });
  }

  sendTicketFim(corpo_texto: string, data_limite: string, doc: string): Observable<any> {
    return this.http.post(`${this.url}api/newTicketFim`, {
      corpo_texto: corpo_texto,
      data_limite: data_limite,
      sub: localStorage.getItem('sub'),
      doc: doc,
      eProfessor: false
    });
  }

  checkIfFinalizou(): Observable<any> {
    return this.http.post(`${this.url}api/checkIfFinalizou`, {
      sub: localStorage.getItem('sub'),
    });
  }
}
