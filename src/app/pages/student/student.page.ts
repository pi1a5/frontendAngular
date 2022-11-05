/* eslint-disable linebreak-style */
/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ModalTicketClosedComponent } from 'src/app/components/modal-ticket-closed/modal-ticket-closed.component';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public pendingTicket: [] = undefined;

  public closedTickets: [] = undefined;

  public isLate: any = undefined;

  public isClosed: any = undefined;

  constructor(
    public apiStudent: ApiStudentService,
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.apiStudent.getPendingTicket().subscribe((pendingTicket) => {
      this.pendingTicket = pendingTicket;
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
    this.apiStudent.getClosedTickets().subscribe((closedTickets) => {
      // console.log(closedTickets);
      this.closedTickets = closedTickets;
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
    this.apiStudent.getStatus().subscribe((data) => {
      console.log(data);
      if (!data) this.isLate = undefined;
      if (data.nome === 'Atrasado') this.isLate = data;
      if (data.nome === 'Fechado') this.isClosed = data;
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

  async presentModal(ticket: any) {
    const modal = await this.modalController.create({
      component: ModalTicketClosedComponent,
      cssClass: 'modalClosedTickets',
      componentProps: { ticket },
    });
    return modal.present();
  }

  receiveDeleteTicket() {
    this.ngOnInit();
  }
}
