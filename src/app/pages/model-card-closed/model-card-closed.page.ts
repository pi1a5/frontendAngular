/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-model-card-closed',
  templateUrl: './model-card-closed.page.html',
  styleUrls: ['./model-card-closed.page.scss'],
})
export class ModelCardClosedPage implements OnInit {
  public ticket: any = null;

  constructor(
    public navParams: NavParams,
    public modalController: ModalController,
    public toastController: ToastController,
    public api: ApiService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.get('ticket');
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
