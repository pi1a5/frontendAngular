/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

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
  ) { }

  ngOnInit() {
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

  async confirm() {
    if (this.validate()) {
      const prontuarioCaps = this.prontuario.toUpperCase(); // Deixar em caixa alta
      this.modalController.dismiss({ prontuario: prontuarioCaps });
    }
  }

  onChangeEvent(event: any) {
    this.prontuario = event.target.value;
  }

  dismiss() {
    this.modalController.dismiss();
  }

  validate() {
    // Verificar se está vazio
    if (!this.prontuario) {
      this.presentToast('Prontuário obrigatório', 'danger', 'close-circle');
      return false;
    }

    // Verificar se tem 9 dígitos e Verificar se começa com SP
    if (this.prontuario.length !== 9 || this.prontuario.substring(0, 2).toUpperCase() !== 'SP') {
      this.presentToast('Prontuário incorreto', 'danger', 'close-circle');
      return false;
    }

    return true;
  }
}
