/* eslint-disable linebreak-style */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  user: string;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
    const email = sessionStorage.getItem('userEmail');
    const splitted = email.split('@');
    if (splitted[1].includes('aluno') || email === 'teste.aluno.g5.pi2a6@gmail.com') {
      this.user = 'student';
    } else if (email === 'adm.g5.pi2a6@gmail.com') {
      this.user = 'admin';
    } else {
      this.user = 'supervisor';
    }
  }

  goToDashboard() {
    if (this.user === 'student') {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

  goToNewTicket() {
    this.router.navigate(['select-process'], { replaceUrl: true });
  }

  goToProcesses() {
    this.router.navigate(['processes'], { replaceUrl: true });
  }

  goToInternships() {
    this.router.navigate(['internships'], { replaceUrl: true });
  }

  goToChart() {
    this.router.navigate(['chart-supervisors'], { replaceUrl: true });
  }

  goToProfile() {
    this.router.navigate(['profile'], { replaceUrl: true });
  }

  goToCourses() {
    this.router.navigate(['courses'], { replaceUrl: true });
  }

  goToSupervisors() {
    this.router.navigate(['admin-supervisors'], { replaceUrl: true });
  }

  goToStudents() {
    this.router.navigate(['admin-students'], { replaceUrl: true });
  }
}
