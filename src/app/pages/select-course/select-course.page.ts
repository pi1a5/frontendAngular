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
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SetProntuarioComponent } from 'src/app/components/selectCoursePage/set-prontuario/set-prontuario.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.page.html',
  styleUrls: ['./select-course.page.scss'],
})
export class SelectCoursePage implements OnInit {
  public confirmedCourse: Object = undefined;

  constructor(
    public api: ApiService,
    public router: Router,
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {}

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

  receiveConfirmedCourse(course: Object) {
    this.confirmedCourse = course;
    console.log(course);
  }

  receiveDeleteTicket() {
    this.ngOnInit();
  }

  async presentModal(course: any) {
    const modal = await this.modalController.create({
      component: SetProntuarioComponent,
      cssClass: 'set-prontuario',
      componentProps: { course },
    });

    await this.loadingController.dismiss();
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) return data;

    return false;
  }

  async setCourse(course: any) {
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
