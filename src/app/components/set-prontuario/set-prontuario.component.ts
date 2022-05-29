import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-set-prontuario',
  templateUrl: './set-prontuario.component.html',
  styleUrls: ['./set-prontuario.component.scss'],
})
export class SetProntuarioComponent implements OnInit {

  public prontuario: string = null;
  public course: any = null;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public navParams: NavParams,
  ) { }

  ngOnInit() { 
    this.course = this.navParams.get('course');
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

  async confirm() {
    if (this.validate()) {  
      this.modalController.dismiss({ prontuario: this.prontuario });
    }
  }

  onChangeEvent(event: any) {
    this.prontuario = event.target.value;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  validate() {
    if (!this.prontuario) {
      this.presentToast('Prontuário obrigatório', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

}
