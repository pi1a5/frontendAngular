import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn() {
    if (sessionStorage.getItem('userId')) return of(true).pipe();
    return of(false).pipe();
  }
}
