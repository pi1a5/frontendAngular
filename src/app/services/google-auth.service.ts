/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {
  constructor() {
    GoogleAuth.initialize();
  }

  async signIn() {
    try {
      const user = await GoogleAuth.signIn();
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
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
