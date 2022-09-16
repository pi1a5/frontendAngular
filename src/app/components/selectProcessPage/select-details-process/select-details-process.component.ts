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
import { LoadingController, ToastController } from '@ionic/angular';
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
    public toastController: ToastController,
    public loadingController: LoadingController,
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

  sendConfirmedProcess() {
    this.confirmedProcess.emit(this.selectedProcess);
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
  }
}
