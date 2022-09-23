/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-pending-ticket',
  templateUrl: './pending-ticket.component.html',
  styleUrls: ['./pending-ticket.component.scss'],
})
export class PendingTicketComponent implements OnInit {
  @Input() pendingTicket: any = undefined;

  constructor(public router: Router) { }

  ngOnInit() {
    // console.log(this.pendingTicket[0]);
    this.pendingTicket[0].datacriado = this.formatDate({ date: this.pendingTicket[0].datacriado });
  }

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
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
