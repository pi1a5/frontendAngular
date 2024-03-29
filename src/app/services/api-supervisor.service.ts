/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})

export class ApiSupervisorService {
  private url: string = this.api.getUrl();

  constructor(private http: HttpClient, private api: ApiService) { }

  // Dashboard
  getTicketsWithoutSupervisor(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsWithoutSupervisor`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getTicketsWithSupervisor(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsWithSupervisor`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  feedbackTicket(idTicket: number, feedback: string, accept: boolean, frequency: number, mandatory: string): Observable<any> {
    return this.http.post(`${this.url}api/feedbackTicket`, {
      sub: sessionStorage.getItem('userId'),
      idTicket,
      feedback,
      aceito: accept,
      idfrequencia: frequency,
      obrigatorio: mandatory,
    });
  }

  // Chart Supervisors
  checkOrientadoresAmount(): Observable<any> {
    return this.http.post(`${this.url}api/checkOrientadoresAmount`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getInternshipsAmountByStatus(): Observable<any> {
    return this.http.post(`${this.url}api/getInternshipsAmountByStatus`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getTicketsStatusByDate(): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsStatusByDate`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getInternshipsAmountByCourse(): Observable<any> {
    return this.http.post(`${this.url}api/getInternshipsAmountByCourse`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getInternshipsAmountByMonth(): Observable<any> {
    return this.http.post(`${this.url}api/getInternshipsAmountByMonth`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getUserTicketAmountAndTotalHours(): Observable<any> {
    return this.http.post(`${this.url}api/getUserTicketAmountAndTotalHours`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getCourseAverageWorkedHours(): Observable<any> {
    return this.http.post(`${this.url}api/getCourseAverageWorkedHours`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  // Process Customization
  newProcess(process: any): Observable<any> {
    return this.http.post(`${this.url}api/createNewProcesso`, {
      sub: sessionStorage.getItem('userId'),
      processo: process,
    });
  }

  updateProcess(oldProcess: any, newProcess: any): Observable<any> {
    return this.http.post(`${this.url}api/updateProcesso`, {
      sub: sessionStorage.getItem('userId'),
      processoAntigo: oldProcess,
      processoNovo: newProcess,
    });
  }

  deleteProcess(processId: number): Observable<any> {
    return this.http.post(`${this.url}api/deleteProcesso`, {
      idprocesso: processId,
    });
  }

  // Internships
  getAllBySupervisor(): Observable<any> {
    return this.http.post(`${this.url}api/getAllBySupervisor`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getSupervisorsByArea(): Observable<any> {
    return this.http.post(`${this.url}api/getSupervisorsByArea`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  transferInternship(supervisorId: number, internshipId: number): Observable<any> {
    return this.http.post(`${this.url}api/transferInternship`, {
      idorientador: supervisorId,
      idestagio: internshipId,
    });
  }

  endInternship(internshipId: number): Observable<any> {
    return this.http.post(`${this.url}api/endInternship`, {
      idestagio: internshipId,
    });
  }
}
