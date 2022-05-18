import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'https://pi1a5back.herokuapp.com/';

  constructor(private http: HttpClient) { }

  testConnection(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  newUser(name: string, email: string, picture: string, idToken: string, sub: string): Observable<Response> {
    return this.http.post<Response>(`${this.url}api/newUser`, {
      name: name,
      email: email,
      picture: picture,
      idToken: idToken,
      sub: sub
    });
  }

  login(idToken: string, sub: string): Observable<User> {
    return this.http.post<User>(`${this.url}api/login`, {
      idToken: idToken,
      sub: sub
    });
  }

  getUser(sub: string): Observable<User> {
    return this.http.post<User>(`${this.url}api/user`, {
      sub: sub
    });
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.url}api/courses`);
  }

  setCourse(id_curso: number, sub: string): Observable<any> {
    return this.http.post<any>(`${this.url}api/setCourse`, {
      id_curso: id_curso,
      sub: sub,
    });
  }
}
