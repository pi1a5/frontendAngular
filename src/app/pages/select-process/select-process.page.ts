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

  public firstTicket: boolean = false;

  constructor(
    public api: ApiService,
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.pendingTicket = this.apiStudent.pendingTicket;
  }

  receiveConfirmedProcess(process: Object) {
    this.confirmedProcess = process;
  }

  receiveGoBackEvent() {
    this.confirmedProcess = undefined;
  }
}
