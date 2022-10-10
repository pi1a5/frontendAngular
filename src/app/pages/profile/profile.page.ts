/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user: any;

  constructor(public router: Router, public api: ApiService) { }

  ngOnInit() {
    this.api.getUser().subscribe((user) => {
      this.user = user;
    }, (error) => {
      console.log(error);
      this.router.navigate(['home'], { replaceUrl: true });
    });
  }
}
