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
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-process',
  templateUrl: './select-process.page.html',
  styleUrls: ['./select-process.page.scss'],
})
export class SelectProcessPage implements OnInit {
  public confirmedProcess: Object = undefined;

  public pendingTicket: Object = undefined;

  public internship: Object = undefined;

  constructor(
    public api: ApiService,
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.apiStudent.checkIfHasInternship().subscribe((data) => {
      this.internship = data;
      if (data) this.getPendingTicket();
    }, (error) => {
      console.log(error);
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      spinner: 'crescent',
    });
    return await loading.present();
  }

  getPendingTicket() {
    this.apiStudent.getPendingTicket().subscribe((pendingTicket) => {
      console.log(pendingTicket);
      this.pendingTicket = pendingTicket;
    }, (error) => {
      if (error.status !== 404) return console.log(error);
    });
  }

  receiveConfirmedProcess(process: Object) {
    this.confirmedProcess = process;
  }
}
