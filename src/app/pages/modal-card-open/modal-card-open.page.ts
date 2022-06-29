/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  LoadingController, ModalController, NavParams, ToastController,
} from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-card-open',
  templateUrl: './modal-card-open.page.html',
  styleUrls: ['./modal-card-open.page.scss'],
})
export class ModalCardOpenPage implements OnInit {
  public ticket: any = null;

  public textArea: any = null;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public apiSupervisor: ApiSupervisorService,
    public api: ApiService,
    public router: Router,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.get('ticket');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
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

  dismiss() {
    this.modalController.dismiss();
  }

  async accept() {
    if (!this.textArea) return this.presentToast('Feedback obrigatório', 'danger', 'close-circle');
    await this.presentLoading();
    this.apiSupervisor.feedbackTicket(this.ticket.id, this.textArea, true).subscribe((data) => {
      // console.log(data);
      this.loadingController.dismiss();
      this.presentToast('Ticket Aceito', 'success', 'checkmark-circle');
      this.modalController.dismiss({ data: true });
    }, (error) => {
      console.log(error);
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    });
  }

  async refuse() {
    if (!this.textArea) return this.presentToast('Feedback obrigatório', 'danger', 'close-circle');
    await this.presentLoading();
    this.apiSupervisor.feedbackTicket(this.ticket.id, this.textArea, false).subscribe((data) => {
      this.loadingController.dismiss();
      this.presentToast('Ticket Recusado', 'success', 'checkmark-circle');
      this.modalController.dismiss({ data: true });
    }, (error) => {
      console.log(error);
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    });
  }

  showPdf(url: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: { url },
    };

    const urlLoad = this.router.serializeUrl(
      this.router.createUrlTree(['/pdf'], navigationExtras),
    );

    window.open(urlLoad, '_blank');
  }
}
