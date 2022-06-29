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
  private url: string = 'https://pi1a5back.herokuapp.com/';

  constructor(private http: HttpClient) { }

  testConnection(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  newUser({ name, email, picture, idToken, sub }: { name: string; email: string; picture: string; idToken: string; sub: string; }): Observable<Response> {
    return this.http.post<Response>(`${this.url}api/newUser`, {
      name,
      email,
      picture,
      idToken,
      sub,
    });
  }

  login(idToken: string, sub: string): Observable<User> {
    return this.http.post<User>(`${this.url}api/login`, {
      idToken,
      sub,
    });
  }

  getUser(): Observable<User> {
    return this.http.post<User>(`${this.url}api/user`, {
      sub: localStorage.getItem('sub'),
    });
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.url}api/courses`);
  }

  setCourseProntuario(idCurso: number, prontuario: string): Observable<any> {
    return this.http.post<any>(`${this.url}api/setCourseProntuario`, {
      idCurso,
      prontuario,
      sub: localStorage.getItem('sub'),
    });
  }
}
