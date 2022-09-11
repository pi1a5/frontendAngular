/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
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
      // console.log('user: ', user);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userId', user.id);
      this.apiLogin(user.name, user.email, user.imageUrl, user.authentication.idToken, user.id);
    } catch (error) {
      this.loadingController.dismiss();
    }
  }

  apiLogin(name: string, email: string, imageUrl: string, token: string, sub: string) {
    this.api.login(token, sub).subscribe((user) => {
      if (isNaN(user.idcurso)) return this.goToSelectCoursePage();
      this.userPage(user.email);
    }, (error) => {
      this.api.newUser({
        name, email, picture: imageUrl, token, sub,
      }).subscribe((resp) => {
        this.api.login(token, sub).subscribe((user) => {
          this.goToSelectCoursePage();
        }, (error) => {
          this.loadingController.dismiss();
          this.presentToast(error.error);
        });
      }, (error) => {
        this.loadingController.dismiss();
        this.presentToast(error.error);
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
