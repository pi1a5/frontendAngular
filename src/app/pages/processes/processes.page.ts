import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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
  public processNumber = 0;
  public documents: any[] = [];

  constructor(
    public api: ApiService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    this.api.getAllProcesses().subscribe(async data => {
      this.processes = data.processos;
      this.documents = data.documentos;
      this.processNumber = this.processes.length;
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

  newProcess() {
    this.isNewProcess = true;
    this.selectedProcess = {
      id: this.processNumber,
      nome: 'Novo processo',
      etapas: []
    }
  }

  receiveProcess(process: any) {
    this.selectedProcess = process;
  }

  receiveDeleteEvent(id: number) {
    this.processes = this.processes.filter(p => p.id !== id);
    this.isNewProcess = false;
    this.selectedProcess = undefined;
  }

  receiveCancelEvent() {
    this.isNewProcess = false;
    this.selectedProcess = undefined;
  }

}
