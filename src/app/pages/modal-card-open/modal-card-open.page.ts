import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-modal-card-open',
  templateUrl: './modal-card-open.page.html',
  styleUrls: ['./modal-card-open.page.scss'],
})
export class ModalCardOpenPage implements OnInit {

  private ticket: any = null;
  private textArea: any = null;

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    private apiSupervisor: ApiSupervisorService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.get('ticket');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent'
    });
    return await loading.present();
  }

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      icon: icon,
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async accept() {
    if (!this.textArea) return this.presentToast('Feedback obrigatório', 'danger', 'close-circle');
    await this.presentLoading();
    this.apiSupervisor.feedbackTicket(this.ticket.id, this.textArea, true).subscribe(data => {
      //console.log(data);
      this.loadingController.dismiss();
      this.presentToast('Ticket Aceito', 'success', 'checkmark-circle');
      this.dismiss();
    }, error => {
      console.log(error);
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    })
  }

  async refuse() {
    if (!this.textArea) return this.presentToast('Feedback obrigatório', 'danger', 'close-circle');
    await this.presentLoading();
    this.apiSupervisor.feedbackTicket(this.ticket.id, this.textArea, false).subscribe(data => {
      //console.log(data);
      this.loadingController.dismiss();
      this.presentToast('Ticket Recusado', 'success', 'checkmark-circle');
      this.dismiss();
    }, error => {
      console.log(error);
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    })
  }

}
