import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiStudentService {

  private url: string = 'https://pi1a5back.herokuapp.com/';

  constructor(private http: HttpClient) { }

  getTicketsUser(sub: string): Observable<any> {
    return this.http.post(`${this.url}api/getTicketsUser`, {
      sub: sub
    })
  }
}
