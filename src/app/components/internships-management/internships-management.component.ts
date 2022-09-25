/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ModalTicketClosedComponent } from '../modal-ticket-closed/modal-ticket-closed.component';
import { ModalTicketOpenComponent } from '../modal-ticket-open/modal-ticket-open.component';

@Component({
  selector: 'app-internships-management',
  templateUrl: './internships-management.component.html',
  styleUrls: ['./internships-management.component.scss'],
})
export class InternshipsManagementComponent implements OnInit {
  public searchTerm: string;

  public internships: any = undefined;

  constructor(
    public apiSupervisor: ApiSupervisorService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getAllBySupervisor().subscribe((data) => {
      console.log(data);
      this.internships = data;
    }, (error) => {
      console.log(error);
    });
  }

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

  async presentModal(ticket: any) {
    console.log(ticket);

    if (ticket.resposta) {
      const modal = await this.modalController.create({
        component: ModalTicketClosedComponent,
        cssClass: 'modalClosedTickets',
        componentProps: { ticket },
      });
      return modal.present();
    }
    const modal = await this.modalController.create({
      component: ModalTicketOpenComponent,
      cssClass: 'modalClosedTickets',
      componentProps: { ticket },
    });
    return modal.present();
  }
}
