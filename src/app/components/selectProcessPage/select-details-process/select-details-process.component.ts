/* eslint-disable no-undef */
/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-details-process',
  templateUrl: './select-details-process.component.html',
  styleUrls: ['./select-details-process.component.scss'],
})
export class SelectDetailsProcessComponent implements OnInit {
  public processes: any[] = [];

  public selectedProcess = undefined;

  @Output() confirmedProcess = new EventEmitter<Object>();

  constructor(
    public api: ApiService,
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.api.getAllProcesses().subscribe(async (data) => {
      this.processes = data.processos;
    }, async (error) => {
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
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
      header: 'Aviso: confirmando o processo você não poderá mudar!',
      message: 'Informe sua carga horária',
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
          label: '4 Horas',
          type: 'radio',
          value: 4,
        },
        {
          label: '6 Horas',
          type: 'radio',
          value: 6,
        },
        {
          label: '8 Horas',
          type: 'radio',
          value: 8,
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  async confirm() {
    const hours = await this.presentAlert();
    if (hours) await this.createNewInternship(this.selectedProcess.id, hours);
  }

  async createNewInternship(processId: number, hours: number) {
    await this.presentLoading();
    this.apiStudent.newInternship(processId, hours).subscribe((data) => {
      this.loadingController.dismiss();
      this.presentToast(data, 'success', 'checkmark-circle');
      this.sendConfirmedProcess();
    }, (error) => {
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  sendConfirmedProcess() {
    this.confirmedProcess.emit(this.selectedProcess);
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
  }
}
