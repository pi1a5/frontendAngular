/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // private url: string = 'https://pi1a5back.herokuapp.com/';
  private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getUrl() {
    return this.url;
  }

  testConnection(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  login(name: string, email: string, picture: string, token: string, sub: string): Observable<User> {
    return this.http.post<User>(`${this.url}api/login`, {
      name,
      email,
      picture,
      token,
      sub,
    });
  }

  getUser(): Observable<User> {
    return this.http.post<User>(`${this.url}api/user`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.url}api/courses`);
  }

  setCourseProntuario(idCurso: number, prontuario: string): Observable<any> {
    return this.http.post<any>(`${this.url}api/setCourseProntuario`, {
      idCurso,
      prontuario,
      sub: sessionStorage.getItem('userId'),
    });
  }

  getAllProcesses(): Observable<any> {
    return this.http.post<any>(`${this.url}api/findAllByCourse`, {
      sub: sessionStorage.getItem('userId'),
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.post<any>(`${this.url}api/getUserProfile`, {
      sub: sessionStorage.getItem('userId'),
    });
  }
}
