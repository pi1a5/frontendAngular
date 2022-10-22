/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-supervisor-chart-card',
  templateUrl: './supervisor-chart-card.component.html',
  styleUrls: ['./supervisor-chart-card.component.scss'],
})
export class SupervisorChartCardComponent implements OnInit {
  public data = undefined;

  constructor(
    public apiSupervisor: ApiSupervisorService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getInternshipsAmountByStatus().subscribe((data) => {
      // console.log(data);
      this.data = data;
    }, (error) => {
      // console.log(error);
      this.data = null;
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
}
