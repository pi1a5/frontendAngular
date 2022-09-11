/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-logoutbutton',
  templateUrl: './logoutbutton.component.html',
  styleUrls: ['./logoutbutton.component.scss'],
})
export class LogoutbuttonComponent implements OnInit {
  constructor(public ggAuth: GoogleAuthService, public router: Router) { }

  ngOnInit() {}

  async signOut() {
    try {
      await this.ggAuth.signOut();
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userId');
      this.router.navigate(['home'], { replaceUrl: true });
    } catch (error) {
      console.log(error);
    }
  }
}
