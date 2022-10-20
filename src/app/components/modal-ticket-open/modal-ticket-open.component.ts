/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  AlertController, LoadingController, ModalController, ToastController,
} from '@ionic/angular';
import { format } from 'date-fns';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-modal-ticket-open',
  templateUrl: './modal-ticket-open.component.html',
  styleUrls: ['./modal-ticket-open.component.scss'],
})
export class ModalTicketOpenComponent implements OnInit {
  public ticket: any = undefined;

  public textArea: string = '';

  constructor(
    public apiSupervisor: ApiSupervisorService,
    public router: Router,
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) {
  }

  ngOnInit() {
    // console.log(this.ticket);
    if (this.ticket.datacriado.length > 10) {
      this.ticket.datacriado = this.formatDate({ date: this.ticket.datacriado });
    }
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      spinner: 'crescent',
    });
    return await loading.present();
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Qual será a frequência dos relatórios desse Estágio?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      inputs: [
        {
          label: 'Mensal',
          type: 'radio',
          value: 1,
        },
        {
          label: 'Trimestral',
          type: 'radio',
          value: 2,
        },
        {
          label: 'Semestral',
          type: 'radio',
          value: 3,
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  async confirm(accept: boolean) {
    if (this.validate(accept)) {
      if (accept) return await this.setFrequency(accept);
      return await this.submitFeedback(accept, 0);
    }
    return false;
  }

  async setFrequency(accept: boolean) {
    // Tratar mensagem automática quando aceita
    if (this.textArea.length === 0) this.textArea = 'Olá! Está tudo certo!';
    // Selecionar frequência
    if (this.ticket.status === 'Aberto' && this.ticket.etapaunica === false) {
      const frequency = await this.presentAlert();
      if (frequency) return await this.submitFeedback(accept, frequency);
      return false;
    }
    return false;
  }

  async submitFeedback(accept: boolean, frequency: number) {
    await this.presentLoading();

    this.apiSupervisor.feedbackTicket(this.ticket.id, this.textArea, accept, frequency).subscribe(async (data) => {
      await this.loadingController.dismiss();
      this.presentToast(data, 'success', 'checkmark-circle');
      this.modalController.dismiss({ data: true });
    }, async (error) => {
      await this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    });
  }

  validate(accept: boolean) {
    if (accept === false && this.textArea.length < 100) {
      this.presentToast('A mensagem deve conter no mínimo 100 caracteres', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
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
