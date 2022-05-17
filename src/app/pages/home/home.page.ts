import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private ggAuth: GoogleAuthService, private api: ApiService, private router: Router) { }

  async signIn() {
    try {
      var user = await this.ggAuth.signIn();
      console.log('user: ', user);
      this.apiLogin(user.name, user.email, user.imageUrl, user.authentication.idToken, user.id)
    } catch (error) {
      console.log(error);
    }
  }

  apiLogin(name: string, email: string, imageUrl: string, idToken: string, sub: string) {
    this.api.login(idToken, sub).subscribe(user => {
      this.userPage(user.email);
    }, error => {
      console.log(error);
      this.api.newUser(name, email, imageUrl, idToken, sub).subscribe(resp => {
        console.log(resp);
        this.api.login(idToken, sub).subscribe(user => {
          this.userPage(user.email);
        }, error => {
          console.log(error);
        });
      }, error => {
        console.log(error);
      });
    });
  }

  userPage(email: string) {
    if (email.includes('aluno')) {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

}
