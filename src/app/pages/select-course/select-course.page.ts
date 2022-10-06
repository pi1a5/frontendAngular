/* eslint-disable linebreak-style */
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
  public modalidades:  any[] = [];

  constructor(
    public api: ApiService,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Aviso: confirmando o processo você não poderá mudar!',
      message: 'Informe sua carga horária',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          // handler: () => {
          //   this.alert = 'Alert canceled';
          // },
        },
      ],
      inputs: [
        {
          label: '4 Horas',
          type: 'radio',
          value: 4,
        },
        {
          label: '6 Horas',
          type: 'radio',
          value: 6,
        },
        {
          label: '8 Horas',
          type: 'radio',
          value: 8,
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  async confirm() {
    const hours = await this.presentAlert();
    if (hours) await this.setCourse(`fsaf`);
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
    this.api.getCourses().subscribe(data => {
      console.log(data);
      
      this.modalidades = data;
    }, error => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
    
  }

  async setCourse(course: any) {
    console.log(course);
    
    // await this.presentLoading();
    // this.idCourse = course.id;
    // const resp = await this.presentModal(course);
    // if (!resp) return;
    // await this.presentLoading();
    // this.api.setCourseProntuario(this.idCourse, resp.prontuario).subscribe(async (data) => {
    //   console.log(data);

    //   await this.loadingController.dismiss();
    //   await this.presentToast('Bem-vindo!', 'success', 'checkmark-circle');
    //   this.userPage(data.email);
    // }, async (error) => {
    //   console.log(error);
    //   await this.loadingController.dismiss();
    //   await this.presentToast(error.error, 'danger', 'close-circle');
    // });
  }

  userPage(email: string) {
    if (email.includes('aluno')) {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }
}
