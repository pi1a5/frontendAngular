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
      this.router.navigate(['home'], { replaceUrl: true });
    } catch (error) {
      console.log(error);
    }
  }

}
