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
  public isSupervisor: boolean = undefined;

  constructor(public router: Router, public api: ApiService) { }

  ngOnInit() {
    const email = sessionStorage.getItem('userEmail');
    const splitted = email.split('@');
    if (splitted[1].includes('aluno') || email === 'alunofake.teste@gmail.com') {
      this.router.navigate(['student'], { replaceUrl: true });
    } else if (email === 'adm.g5.pi2a6@gmail.com') {
      this.router.navigate(['courses'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }
}
