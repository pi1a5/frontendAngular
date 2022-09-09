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
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.page.html',
  styleUrls: ['./processes.page.scss'],
})
export class ProcessesPage implements OnInit {
  public isNewProcess: boolean = false;

  public processes: any[] = [];

  public selectedProcess = undefined;

  public saveBeforeEdit = undefined;

  public processNumber = 0;

  public documents: any[] = [];

  constructor(
    public api: ApiService,
    public apiSupervisor: ApiSupervisorService,
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
      this.documents = data.documentos;
      this.processNumber = this.processes.length;
    }, async (error) => {
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  newProcess() {
    this.isNewProcess = true;
    this.selectedProcess = {
      id: this.processNumber,
      nome: 'Novo processo',
      etapas: [],
    };
  }

  isThereStep(process: any) {
    if (process.etapas.length <= 0) {
      this.presentToast('Processo deve conter pelo menos 1 etapa', 'danger', 'close-circle');
      return false;
    }
    return true;
  }

  async saveNewProcess(process: any) {
    if (!this.isThereStep(process)) return;

    await this.presentLoading();
    this.apiSupervisor.newProcess(process).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast(data, 'success', 'checkmark-circle');
      this.processes.push(process);
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  async saveEditedProcess(process: any) {
    console.log(this.saveBeforeEdit);
    console.log(process);

    // await this.presentLoading();
    // this.apiSupervisor.updateProcess(process).subscribe(async (data) => {
    //   await this.loadingController.dismiss();
    //   await this.presentToast(data, 'success', 'checkmark-circle');
    //   for (let index = 0; index < this.processes.length; index++) {
    //     if (this.processes[index].id === process.id) {
    //       this.processes[index] = process;
    //     }
    //   }
    //   this.reset();
    // }, async (error) => {
    //   await this.loadingController.dismiss();
    //   await this.presentToast(error.error, 'danger', 'close-circle');
    //   this.reset();
    // });
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
    this.saveBeforeEdit = structuredClone(process);
  }

  async receiveSaveEvent(process: any) {
    if (process.isNew) {
      this.saveNewProcess(process.process);
    } else {
      this.saveEditedProcess(process.process);
    }
  }

  async receiveDeleteEvent(id: number) {
    if (this.processes.length === 1) return await this.presentToast('Deverá ter pelo menos um processo', 'warning', 'warning-outline');

    await this.presentLoading();
    this.apiSupervisor.deleteProcess(id).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast(data, 'success', 'checkmark-circle');
      this.processes = this.processes.filter((p) => p.id !== id);
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  receiveCancelEvent() {
    this.reset();
  }

  reset() {
    this.isNewProcess = false;
    this.selectedProcess = undefined;
  }
}
