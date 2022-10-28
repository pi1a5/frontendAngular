/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-return-await */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.page.html',
  styleUrls: ['./select-course.page.scss'],
})
export class SelectCoursePage implements OnInit {
  public modalidades: any[] = [];

  constructor(
    public api: ApiService,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.api.getUser().subscribe((user) => {
      // console.log(user);
      if (user.idcurso !== null) return this.userPage(sessionStorage.getItem('userEmail'));
    }, (error) => {
      console.log(error);
    });
    this.loadCourses();
  }

  async presentAlert(course: any) {
    const alert = await this.alertController.create({
      header: course.nome,
      message: 'Informe seu prontuário sem "SP"',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (prontuario) => {
            if (!this.isProntuarioValid(prontuario[0])) return false;
            this.setCourse(course.id, `SP${prontuario[0]}`);
          },
        },
      ],
      inputs: [
        {
          placeholder: '123456',
          attributes: {
            maxlength: 7,
          },
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      spinner: 'crescent',
    });
    return await loading.present();
  }

  loadCourses() {
    this.api.getCourses().subscribe((data) => {
      // console.log(data);
      this.modalidades = data;
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  isProntuarioValid(prontuario: string) {
    if (prontuario.length < 6 || !this.modulo11(prontuario)) {
      this.presentToast('Prontuário inválido', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  modulo11(prontuario: any) {
    const corpo = prontuario.slice(0, prontuario.length - 1);
    const verificador = prontuario.slice(prontuario.length - 1);
    const multiplicadores = [7, 6, 5, 4, 3, 2];

    let total = 0;
    for (let index = 0; index < corpo.length; index++) total += corpo[index] * multiplicadores[index];

    const resto = (total * 10) % 11;

    if (resto === 10 && verificador.toUpperCase() === 'X') return true;
    if (Number(verificador) === resto) return true;

    return false;
  }

  async setCourse(courseId: number, prontuario: string) {
    await this.presentLoading();
    this.api.setCourseProntuario(courseId, prontuario).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast('Bem-vindo!', 'success', 'checkmark-circle');
      this.userPage(sessionStorage.getItem('userEmail'));
    }, async (error) => {
      console.log(error);
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

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
}
