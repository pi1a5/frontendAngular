/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ModalTicketClosedComponent } from '../modal-ticket-closed/modal-ticket-closed.component';
import { ModalTicketOpenComponent } from '../modal-ticket-open/modal-ticket-open.component';
import { TransferComponent } from '../transfer/transfer.component';

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
    public toastController: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getAllBySupervisor().subscribe((data) => {
      this.internships = data.processos;
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'Tem certeza que deseja encerrar esse estágio?',
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
            this.endInternship(id);
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

  async presentTransfer(internshipId: number) {
    const modal = await this.modalController.create({
      component: TransferComponent,
      // cssClass: 'modalClosedTickets',
      componentProps: { internshipId },
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) this.ngOnInit();
  }

  async presentModal(ticket: any) {
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
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) this.ngOnInit();
  }

  endInternship(internshipId: number) {
    this.apiSupervisor.endInternship(internshipId).subscribe((data) => {
      // console.log(data);
      this.presentToast(data, 'success', 'checkmark-circle');
      this.ngOnInit();
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  calculateProgress(cargaAtual: number, cargaTotal: number) {
    if (cargaAtual === 0) return '.0';
    const progress = Math.round((cargaAtual * 10) / cargaTotal);
    let stringProgress = `.${progress}`;
    // console.log(progress);
    if (progress === 10) stringProgress = '1.0';
    return stringProgress;
  }

  calculatePercent(cargaAtual: number, cargaTotal: number) {
    if (cargaAtual === 0) return 0;
    const progress = Math.round((cargaAtual * 100) / cargaTotal);
    return progress;
  }
}
