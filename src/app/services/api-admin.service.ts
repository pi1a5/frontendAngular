/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable camelcase */
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
export class ApiAdminService {
  private url: string = this.api.getUrl();

  constructor(private http: HttpClient, private api: ApiService) { }

  // Cursos
  getAreasWithCourses(): Observable<any> {
    return this.http.get(`${this.url}api/getAreasWithCourses`);
  }

  newArea(area: any): Observable<any> {
    return this.http.post(`${this.url}api/createArea`, {
      sub: sessionStorage.getItem('userId'),
      area,
    });
  }

  updateArea(oldArea: any, newArea: any): Observable<any> {
    return this.http.post(`${this.url}api/updateArea`, {
      sub: sessionStorage.getItem('userId'),
      areaAntiga: oldArea,
      areaNova: newArea,
    });
  }

  deleteArea(areaId: number): Observable<any> {
    return this.http.post(`${this.url}api/deleteArea`, {
      idarea: areaId,
    });
  }

  // Orientadores
  getSupervisors(): Observable<any> {
    return this.http.get(`${this.url}api/getSupervisors`);
  }

  deleteSupervisor(id: number): Observable<any> {
    return this.http.post(`${this.url}api/deleteSupervisor`, {
      id,
    });
  }
}
