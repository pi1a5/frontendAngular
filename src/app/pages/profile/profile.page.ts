import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private user: User;

  constructor(private ggAuth: GoogleAuthService, private router: Router, private api: ApiService) { }

  ngOnInit() {
    try { 
      this.api.getUser().subscribe(user => {
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

  goToNewTicket() {
    
  }

  goToDashboard() {
    this.router.navigate(['student'], { replaceUrl: true });
  }
}
