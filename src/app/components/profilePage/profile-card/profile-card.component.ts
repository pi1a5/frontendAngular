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

  loadUserProfile() {
    this.user = undefined;
    this.api.getUserProfile().subscribe((data) => {
      console.log(data);
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

  setName(name: string) {
    this.api.updateName(name).subscribe((data) => {
      this.presentToast(data, 'success', 'checkmark-circle');
      this.loadUserProfile();
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  editName() {
    this.presentNameAlert();
  }
}
