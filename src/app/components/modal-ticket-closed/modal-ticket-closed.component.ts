/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';

@Component({
  selector: 'app-modal-ticket-closed',
  templateUrl: './modal-ticket-closed.component.html',
  styleUrls: ['./modal-ticket-closed.component.scss'],
})
export class ModalTicketClosedComponent implements OnInit {
  public ticket: any = undefined;

  constructor(public modalController: ModalController, public router: Router) {
  }

  ngOnInit() {
    // console.log(this.ticket);
    if (this.ticket.datacriado.length > 10) {
      this.ticket.datacriado = this.formatDate({ date: this.ticket.datacriado });
    }
    if (this.ticket.datafechado.length > 10) {
      this.ticket.datafechado = this.formatDate({ date: this.ticket.datafechado });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '/').replace(/T.+/, '')), 'dd/MM/yyyy');
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
