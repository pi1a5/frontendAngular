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

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      color,
      icon,
      duration: 2000,
    });
    toast.present();
  }

  async signIn() {
    try {
      const user = await this.ggAuth.signIn();
      if (!user) return;
      await this.presentLoading();
      if (this.verifyEmail(user.email)) {
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userId', user.id);
        this.apiLogin(user.name, user.email, user.imageUrl, user.authentication.idToken, user.id);
      } else {
        this.loadingController.dismiss();
        return this.presentToast('Entre apenas com email Institucional', 'danger', 'close-circle');
      }
    } catch (error) {
      this.loadingController.dismiss();
    }
  }

  verifyEmail(email: string) {
    if (email.includes('pl1a5.grupo5@gmail.com')) return true;
    if (email.includes('teste.orientador.g5.pi2a6@gmail.com')) return true;
    if (email.includes('teste.aluno.g5.pi2a6@gmail.com')) return true;
    if (email.includes('adm.g5.pi2a6@gmail.com')) return true;
    if (email.includes('ifsp.edu.br')) return true;

    return false;
  }

  apiLogin(name: string, email: string, imageUrl: string, token: string, sub: string) {
    this.api.login(name, email, imageUrl, token, sub).subscribe((user) => {
      this.loadingController.dismiss();
      if (user.idcurso === null) return this.goToSelectCoursePage();
      this.userPage(user.email);
    }, (error) => {
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      // if (error.status === 404) this.newUser(name, email, imageUrl, token, sub);
    });
  }

  // newUser(name: string, email: string, imageUrl: string, token: string, sub: string) {
  //   this.api.newUser({
  //     name, email, picture: imageUrl, token, sub,
  //   }).subscribe((resp) => {
  //     this.api.login(token, sub).subscribe((user) => {
  //       this.goToSelectCoursePage();
  //     }, (error) => {
  //       this.loadingController.dismiss();
  //       this.presentToast(error.error, 'danger', 'close-circle');
  //     });
  //   }, (error) => {
  //     this.loadingController.dismiss();
  //     this.presentToast(error.error, 'danger', 'close-circle');
  //   });
  // }

  userPage(email: string) {
    const splitted = email.split('@');
    if (splitted[1].includes('aluno') || email === 'teste.aluno.g5.pi2a6@gmail.com') {
      this.router.navigate(['student'], { replaceUrl: true });
    } else if (email === 'adm.g5.pi2a6@gmail.com') {
      this.router.navigate(['courses'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

  goToSelectCoursePage() {
    this.loadingController.dismiss();
    this.router.navigate(['select-course'], { replaceUrl: true });
  }
}
