/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-modal-ticket-closed',
  templateUrl: './modal-ticket-closed.component.html',
  styleUrls: ['./modal-ticket-closed.component.scss'],
})
export class ModalTicketClosedComponent implements OnInit {
  public ticket: any = undefined;

  constructor(
    public router: Router,
    public modalController: ModalController,
    public toastController: ToastController,
  ) {
  }

  ngOnInit() {
    console.log(this.ticket);
    if (this.ticket.datacriado.length > 10) {
      this.ticket.datacriado = this.formatDate({ date: this.ticket.datacriado });
    }
    if (this.ticket.datafechado.length > 10) {
      this.ticket.datafechado = this.formatDate({ date: this.ticket.datafechado });
    }
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

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

  showPdf(url: string) {
    if (!url) return this.presentToast('O documento não pode ser aberto', 'danger', 'close-circle');

    const navigationExtras: NavigationExtras = {
      queryParams: { url },
    };

    const urlLoad = this.router.serializeUrl(
      this.router.createUrlTree(['/pdf'], navigationExtras),
    );

    return window.open(urlLoad, '_blank');
  }
}
