/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-return-await */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-process',
  templateUrl: './select-process.page.html',
  styleUrls: ['./select-process.page.scss'],
})
export class SelectProcessPage implements OnInit {
  public processes: any[] = [];

  public selectedProcess = undefined;

  constructor(
    public api: ApiService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.loadProcesses();
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

  async loadProcesses() {
    this.api.getAllProcesses().subscribe(async (data) => {
      this.processes = data.processos;
    }, async (error) => {
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  confirm() {
    console.log(this.selectedProcess);
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
  }
}
