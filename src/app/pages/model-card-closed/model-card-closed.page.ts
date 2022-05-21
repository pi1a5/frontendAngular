import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-model-card-closed',
  templateUrl: './model-card-closed.page.html',
  styleUrls: ['./model-card-closed.page.scss'],
})
export class ModelCardClosedPage implements OnInit {

  private ticket: any = null;

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.get('ticket');
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

}
