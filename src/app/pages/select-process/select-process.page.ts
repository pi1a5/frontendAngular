/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-select-process',
  templateUrl: './select-process.page.html',
  styleUrls: ['./select-process.page.scss'],
})
export class SelectProcessPage implements OnInit {
  public confirmedProcess: Object = undefined;

  public pendingTicket: Object = undefined;

  public ended: string = undefined;

  public internship: Object = undefined;

  public waitWarning: Object = undefined;

  constructor(
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.apiStudent.checkIfHasInternship().subscribe((data) => {
      // console.log(data);
      this.internship = data;
      if (data) this.checkIfEnded();
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
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

  checkIfEnded() {
    this.apiStudent.checkIfEnded().subscribe((data) => {
      this.ended = data;
      if (!data) this.getPendingTicket();
    }, (error) => {
      this.ended = null;
    });
  }

  getPendingTicket() {
    this.apiStudent.getPendingTicket().subscribe((pendingTicket) => {
      this.pendingTicket = pendingTicket;
      if (!pendingTicket) this.getStatus();
    }, (error) => {
      this.pendingTicket = null;
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  getStatus() {
    this.apiStudent.getStatus().subscribe((data) => {
      // console.log(data);
      if (data.nome === 'Em Dia') {
        this.waitWarning = data;
      } else {
        this.waitWarning = null;
      }
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  receiveConfirmedProcess(process: Object) {
    this.confirmedProcess = process;
  }

  receiveDeleteTicket() {
    this.ngOnInit();
  }
}
