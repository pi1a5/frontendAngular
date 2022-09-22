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
import { ModalController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';
import { ModelCardClosedPage } from '../model-card-closed/model-card-closed.page';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public pendingTicket: any = undefined;

  public closedTickets: [] = [];

  constructor(
    public apiStudent: ApiStudentService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.apiStudent.getPendingTicket().subscribe((pendingTicket) => {
      console.log(pendingTicket);
      this.pendingTicket = pendingTicket;
    }, (error) => {
      if (error.status !== 404) return console.log(error);
    });
    this.apiStudent.getClosedTickets().subscribe((closedTickets) => {
      console.log(closedTickets);
      this.closedTickets = closedTickets;
    }, (error) => {
      if (error.status !== 404) return console.log(error);
    });
  }

  async presentModal(ticket: any) {
    const modal = await this.modalController.create({
      component: ModelCardClosedPage,
      componentProps: { ticket },
    });
    return modal.present();
  }

  // defineTickets(tickets: any) {
  //   for (let index = 0; index < tickets.length; index++) {
  //     if (tickets[index].feedback) {
  //       this.ticketsE.push(tickets[index]);

  //       const indexNovo = this.ticketsE.length;

  //       if (tickets[index].datacriado) {
  //         this.ticketsE[indexNovo - 1].datacriado = this.formatDate({ date: tickets[index].datacriado });
  //       }
  //       if (tickets[index].datalimite) {
  //         this.ticketsE[indexNovo - 1].datalimite = this.formatDate({ date: tickets[index].datalimite });
  //       }
  //       if (tickets[index].datafechado) {
  //         this.ticketsE[indexNovo - 1].datafechado = this.formatDate({ date: tickets[index].datafechado });
  //       }
  //     } else {
  //       this.ticketP = tickets[index];
  //       console.log(this.ticketP);

  //       if (tickets[index].datacriado) {
  //         this.ticketP.datacriado = this.formatDate({ date: tickets[index].datacriado });
  //       }
  //       if (tickets[index].datalimite) {
  //         this.ticketP.datalimite = this.formatDate({ date: tickets[index].datalimite });
  //       }
  //     }
  //   }
  // }
}
