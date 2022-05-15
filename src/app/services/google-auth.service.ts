import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor() {
    GoogleAuth.initialize();
  }

  async signIn() {
    try {
      const user = await GoogleAuth.signIn();
      localStorage.setItem('sub', user.id);
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  async refresh() {
    try {
      const authCode = await GoogleAuth.refresh();
      return authCode;
    } catch (error) {
      console.log(error);
    }
  }

  async signOut() {
    try {
      await GoogleAuth.signOut();
      localStorage.removeItem('sub');
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
