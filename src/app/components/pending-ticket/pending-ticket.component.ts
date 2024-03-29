/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-pending-ticket',
  templateUrl: './pending-ticket.component.html',
  styleUrls: ['./pending-ticket.component.scss'],
})
export class PendingTicketComponent implements OnInit {
  @Input() pendingTicket: any = undefined;

  @Output() deleteTicket: any = new EventEmitter<any>();

  constructor(
    public apiStudent: ApiStudentService,
    public router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.pendingTicket[0].datacriado = this.formatDate({ date: this.pendingTicket[0].datacriado });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      spinner: 'crescent',
    });
    return loading.present();
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'Ao excluir esse ticket você não poderá recuperá-lo.',
      message: 'Deseja mesmo excluir o ticket?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Sim, desejo',
          role: 'confirm',
          handler: () => {
            this.deleteRequest(id);
          },
        },
      ],
    });

    await alert.present();
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

  delete(id: number) {
    this.presentAlert(id);
  }

  deleteRequest(id: number) {
    this.presentLoading();
    this.apiStudent.deletePendingTicket(id).subscribe((data) => {
      this.loadingController.dismiss();
      this.presentToast(data, 'success', 'checkmark-circle');
      this.deleteTicket.emit();
    }, (error) => {
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
    });
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
