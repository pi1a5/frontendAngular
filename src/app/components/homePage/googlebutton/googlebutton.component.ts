import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-googlebutton',
  templateUrl: './googlebutton.component.html',
  styleUrls: ['./googlebutton.component.scss'],
})
export class GooglebuttonComponent implements OnInit {

  constructor(
    public api: ApiService,
    public ggAuth: GoogleAuthService,
    public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Iniciando sessão',
      spinner: 'crescent',
    });
    return await loading.present();
  }

  async presentToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      icon: 'information-circle',
      color: 'danger',
    });
    toast.present();
  }

  async signIn() {
    try {
      const user = await this.ggAuth.signIn();
      if (!user) return;
      await this.presentLoading();
      console.log('user: ', user);
      this.apiLogin(user.name, user.email, user.imageUrl, user.authentication.idToken, user.id);
    } catch (error) {
      this.loadingController.dismiss();
      console.log(error);
    }
  }

  apiLogin(name: string, email: string, imageUrl: string, idToken: string, sub: string) {
    this.api.login(idToken, sub).subscribe((user) => {
      const courseSelected = localStorage.getItem('courseSelected');
      if (courseSelected !== 'true') return this.goToSelectCoursePage();
      this.userPage(user.email);
    }, (error) => {
      console.log(error);
      this.api.newUser({ name, email, picture: imageUrl, idToken, sub }).subscribe((resp) => {
        this.api.login(idToken, sub).subscribe((user) => {
          this.goToSelectCoursePage();
        }, (error) => {
          this.loadingController.dismiss();
          this.presentToast(error.error);
          console.log(error);
        });
      }, (error) => {
        this.loadingController.dismiss();
        this.presentToast(error.error);
        console.log(error);
      });
    });
  }

  userPage(email: string) {
    this.loadingController.dismiss();
    if (email.includes('aluno')) {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

  goToSelectCoursePage() {
    this.loadingController.dismiss();
    this.router.navigate(['select-course'], { replaceUrl: true });
  }

}