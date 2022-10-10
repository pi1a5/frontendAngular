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
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ApiAdminService } from 'src/app/services/api-admin.service';

@Component({
  selector: 'app-supervisors-list',
  templateUrl: './supervisors-list.component.html',
  styleUrls: ['./supervisors-list.component.scss'],
})
export class SupervisorsListComponent implements OnInit {
  public searchTerm: string;

  public supervisors: any = undefined;

  constructor(
    public apiAdmin: ApiAdminService,
    public modalController: ModalController,
    public toastController: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loadSupervisors();
  }

  async presentAlert(id: number, supervisorName: string) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: `Tem certeza que deseja excluir ${supervisorName} permanentemente?`,
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
            this.deleteSupervisor(id);
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

  loadSupervisors() {
    this.apiAdmin.getSupervisors().subscribe((data) => {
      // console.log(data);
      this.supervisors = data;
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  deleteSupervisor(id: number) {
    this.apiAdmin.deleteSupervisor(id).subscribe((data) => {
      this.presentToast(data, 'success', 'checkmark-circle');
      this.loadSupervisors();
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }
}
