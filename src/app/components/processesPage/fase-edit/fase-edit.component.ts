import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fase-edit',
  templateUrl: './fase-edit.component.html',
  styleUrls: ['./fase-edit.component.scss'],
})
export class FaseEditComponent implements OnInit {

  public fase: any = null;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
    public navParams: NavParams,
    ) {}

  ngOnInit() {
    this.fase = this.navParams.get('fase');
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

  // async confirm() {
  //   if (this.validate()) {
  //     const prontuarioCaps = this.prontuario.toUpperCase(); // Deixar em caixa alta
  //     this.modalController.dismiss({ prontuario: prontuarioCaps });
  //   }
  // }

  // onChangeEvent(event: any) {
  //   this.prontuario = event.target.value;
  // }

  dismiss() {
    this.modalController.dismiss();
  }

  // validate() {
  //   // Verificar se está vazio
  //   if (!this.prontuario) {
  //     this.presentToast('Prontuário obrigatório', 'danger', 'close-circle');
  //     return false;
  //   }

  //   // Verificar se tem 7 dígitos e Verificar se começa com SP
  //   if (this.prontuario.length !== 9 || this.prontuario.substring(0, 2).toUpperCase() !== 'SP') {
  //     this.presentToast('Prontuário incorreto', 'danger', 'close-circle');
  //     return false;
  //   }

  //   return true;
  // }

}
