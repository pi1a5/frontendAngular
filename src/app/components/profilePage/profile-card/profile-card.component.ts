/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  public user = undefined;

  constructor(
    public api: ApiService,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.loadUserProfile();
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

  async presentNameAlert() {
    const alert = await this.alertController.create({
      header: 'Mudar nome',
      message: 'Informe seu nome',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (name) => {
            if (name[0].length < 9) {
              this.presentToast('Nome inválido', 'danger', 'close-circle');
              return false;
            }
            this.setName(name[0]);
          },
        },
      ],
      inputs: [
        {
          placeholder: 'Ana Clara',
          attributes: {
            maxlength: 50,
          },
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  async presentProntuarioAlert() {
    const alert = await this.alertController.create({
      header: 'Mudar prontuário',
      message: 'Informe seu prontuário sem "SP"',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (prontuario) => {
            if (!this.isProntuarioValid(prontuario[0])) return false;
            this.setProntuario(`SP${prontuario[0]}`);
          },
        },
      ],
      inputs: [
        {
          placeholder: '123456',
          attributes: {
            maxlength: 7,
          },
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  loadUserProfile() {
    this.user = undefined;
    this.api.getUserProfile().subscribe((data) => {
      // console.log(user);
      if (!data) {
        this.user = null;
      } else {
        this.user = data[0];
      }
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  isProntuarioValid(prontuario: string) {
    if (prontuario.length < 6 || !this.modulo11(prontuario)) {
      this.presentToast('Prontuário inválido', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  modulo11(prontuario: any) {
    const corpo = prontuario.slice(0, prontuario.length - 1);
    const verificador = prontuario.slice(prontuario.length - 1);
    const multiplicadores = [7, 6, 5, 4, 3, 2];

    let total = 0;
    for (let index = 0; index < corpo.length; index++) total += corpo[index] * multiplicadores[index];

    const resto = (total * 10) % 11;

    if (resto === 10 && verificador.toUpperCase() === 'X') return true;
    if (Number(verificador) === resto) return true;

    return false;
  }

  setName(name: string) {
    this.api.updateName(name).subscribe((data) => {
      this.presentToast(data, 'success', 'checkmark-circle');
      this.loadUserProfile();
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  setProntuario(prontuario: string) {
    this.api.updateProntuario(prontuario).subscribe((data) => {
      this.presentToast(data, 'success', 'checkmark-circle');
      this.loadUserProfile();
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  editName() {
    this.presentNameAlert();
  }

  editProntuario() {
    this.presentProntuarioAlert();
  }
}
