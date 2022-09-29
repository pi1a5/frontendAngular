/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ModalTicketOpenComponent } from '../modal-ticket-open/modal-ticket-open.component';

@Component({
  selector: 'app-tickets-with-supervisor',
  templateUrl: './tickets-with-supervisor.component.html',
  styleUrls: ['./tickets-with-supervisor.component.scss'],
})
export class TicketsWithSupervisorComponent implements OnInit {
  public tickets: [] = undefined;

  constructor(
    public apiSupervisor: ApiSupervisorService,
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getTicketsWithSupervisor().subscribe((data) => {
      // console.log('Alunos com orientador: ', data);
      this.tickets = data;
    }, (error) => {
      this.tickets = null;
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

  async presentModal(ticket: any) {
    const modal = await this.modalController.create({
      component: ModalTicketOpenComponent,
      cssClass: 'modalClosedTickets',
      componentProps: { ticket },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) this.ngOnInit();
  }
}
