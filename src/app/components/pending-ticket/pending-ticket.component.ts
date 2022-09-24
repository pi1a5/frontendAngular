/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-pending-ticket',
  templateUrl: './pending-ticket.component.html',
  styleUrls: ['./pending-ticket.component.scss'],
})
export class PendingTicketComponent implements OnInit {
  @Input() pendingTicket: any = undefined;

  constructor(
    public apiStudent: ApiStudentService,
    public router: Router,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.pendingTicket[0].datacriado = this.formatDate({ date: this.pendingTicket[0].datacriado });
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

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
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
