/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent implements OnInit {
  public internshipId: number = undefined;

  public supervisors: [] = undefined;

  constructor(
    public apiSupervisor: ApiSupervisorService,
    public toastController: ToastController,
    public modalController: ModalController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.apiSupervisor.getSupervisorsByArea().subscribe((data) => {
      // console.log(data);
      this.supervisors = data;
    }, (error) => {
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    });
  }

  async presentAlert(id: number, supervisorName: string) {
    const alert = await this.alertController.create({
      header: 'Espere!',
      subHeader: `Tem certeza que deseja transferir esse estágio para ${supervisorName}?`,
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
            this.transfer(id);
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

  transfer(supervisorId: number) {
    // console.log(supervisorId);
    // console.log(this.internshipId);
    this.apiSupervisor.transferInternship(supervisorId, this.internshipId).subscribe((data) => {
      this.presentToast(data, 'success', 'checkmark-circle');
      this.modalController.dismiss({ data: true });
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
      this.dismiss();
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
