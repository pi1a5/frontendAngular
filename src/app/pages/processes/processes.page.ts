/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
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

  public processes: any[] = undefined;

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
      console.log(data);
      
      if (!data.processos) {
        this.processes = null;
        this.documents = data.documentos;
        this.processNumber = 0;
      } else {
        this.processes = data.processos;
        this.documents = data.documentos;
        this.processNumber = this.processes.length;
      }
    }, async (error) => {
      this.processes = null;
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  newProcess() {
    this.isNewProcess = true;
    this.selectedProcess = {
      id: this.processNumber,
      nome: '',
      etapas: [],
    };
  }

  async saveNewProcess(process: any) {
    await this.presentLoading();
    this.apiSupervisor.newProcess(process).subscribe(async (data) => {
      // console.log(data);
      await this.loadingController.dismiss();
      await this.presentToast('Processo criado com sucesso!', 'success', 'checkmark-circle');
      this.loadProcesses();
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  async saveEditedProcess(process: any) {
    await this.presentLoading();
    this.apiSupervisor.updateProcess(this.saveBeforeEdit, process).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast(data, 'success', 'checkmark-circle');
      this.loadProcesses();
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  verifyObjects(oldObj: any, newObj: any) {
    const aProps = Object.getOwnPropertyNames(oldObj);
    const bProps = Object.getOwnPropertyNames(newObj);

    // Verificar se o número de propriedades é igual
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // Verificar se os valores da mesma propriedade são iguais
      if (JSON.stringify(oldObj[propName]) !== JSON.stringify(newObj[propName])) {
        return false;
      }
    }

    // São iguais
    return true;
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
    this.saveBeforeEdit = structuredClone(process);
  }

  async validate(isNew: boolean, process: any) {
    if (!isNew) {
      // Verificar se os objetos são diferentes
      if (this.verifyObjects(this.saveBeforeEdit, process)) {
        await this.presentToast('Não foi identificado nenhuma mudança', 'warning', 'warning-outline');
        return false;
      }
    }

    // Verificar se tem loop em etapa única
    if (process.etapas.length === 1 && process.etapas[0].loop === true) {
      await this.presentToast('Etapas únicas não podem se repetir', 'warning', 'warning-outline');
      return false;
    }

    // Verificar se mais de uma etapa tem loop
    let loopCount = 0;
    for (let index = 0; index < process.etapas.length; index++) {
      const etapa = process.etapas[index];
      if (etapa.loop) loopCount++;
    }
    if (loopCount > 1) {
      await this.presentToast('Somente ume etapa poderá se repetir', 'warning', 'warning-outline');
      return false;
    }

    return true;
  }

  async receiveSaveEvent(process: any) {
    if (!await this.validate(process.isNew, process.process)) return;

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
