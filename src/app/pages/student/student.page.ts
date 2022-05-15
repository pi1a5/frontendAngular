import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  private user: User = null;

  constructor(private ggAuth: GoogleAuthService, private api: ApiService, private router: Router) { }

  async ngOnInit() {
    try { 
      this.api.getUser(localStorage.getItem('sub')).subscribe(user => {
        this.user = user;
      }, error => {
        console.log(error);
        this.signOut();
      })
    } catch (error) {
      console.log(error);
    }
  }

  async signOut() {
    try {
      await this.ggAuth.signOut();
      this.router.navigate(['home'], { replaceUrl: true });
    } catch (error) {
      console.log(error);
    }
  }
}
