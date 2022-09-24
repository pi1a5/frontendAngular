/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output, SimpleChanges,
} from '@angular/core';

import {
  AlertController, ItemReorderCustomEvent, ModalController, ToastController,
} from '@ionic/angular';

import { FaseEditComponent } from '../fase-edit/fase-edit.component';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.scss'],
})
export class ProcessEditComponent implements OnInit {
  @Input() newProcess: boolean = false;

  @Input() process: any = undefined;

  @Input() documents: any[] = [];

  @Output() saveProcess = new EventEmitter<any>();

  @Output() deleteProcess = new EventEmitter<number>();

  @Output() cancelNewProcess = new EventEmitter<string>();

  public editProcess: any = undefined;

  public stepNumber = 0;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.editProcess = {
      id: this.process.id,
      nome: this.process.nome,
      etapas: this.process.etapas,
    };
    this.stepNumber = this.process.etapas.length;
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

  async presentModal(etapa, documentos, novaEtapa) {
    const modal = await this.modalController.create({
      component: FaseEditComponent,
      componentProps: {
        etapa,
        documentos,
        novaEtapa,
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) return data;

    return false;
  }

  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Cuidado!',
      subHeader: 'Ao excluir um processo você não poderá recuperá-lo.',
      message: 'Deseja mesmo excluir esse processo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Sim, desejo  ',
          role: 'confirm',
          handler: () => {
            this.deleteProcess.emit(id);
          },
        },
      ],
    });

    await alert.present();
  }

  onChangeName(value: any) {
    this.editProcess.nome = value;
  }

  reorderFases(ev: ItemReorderCustomEvent) {
    ev.detail.complete(true);
    const faseToMove = this.editProcess.etapas.splice(ev.detail.from, 1)[0];
    this.editProcess.etapas.splice(ev.detail.to, 0, faseToMove);
  }

  async editStep(step: any) {
    this.handleModalResponse(await this.presentModal(step, this.documents, false));
  }

  deleteFase(faseId: number) {
    this.editProcess.etapas = this.editProcess.etapas.filter((f) => f.id !== faseId);
  }

  async newFase() {
    const etapa = {
      id: this.process.etapas.length,
      nome: 'Nova etapa',
      prazo: 10,
      documentos: [],
      loop: false,
    };

    this.handleModalResponse(await this.presentModal(etapa, this.documents, true));
  }

  handleModalResponse(response) {
    if (!response) return;

    if (response.novaEtapa) {
      this.editProcess.etapas.push(response.etapa);
      this.stepNumber++;
    } else {
      for (let index = 0; index < this.editProcess.etapas.length; index++) {
        if (this.editProcess.etapas[index].id === response.etapa.id) {
          this.editProcess.etapas[index] = response.etapa;
        }
      }
    }
  }

  validate() {
    // Verificar se tem no mínimo 3 dígitos sem contar espaços em branco
    if (this.editProcess.nome.trim().length < 3) {
      this.presentToast('Nome do processo deve conter no mínimo 3 caracteres', 'danger', 'close-circle');
      return false;
    }
    // Verificar se tem pelo menos 1 etapa
    if (this.editProcess.etapas.length <= 0) {
      this.presentToast('Processo deve conter pelo menos 1 etapa', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  sendSave() {
    if (this.validate()) {
      this.saveProcess.emit({ isNew: this.newProcess, process: this.editProcess });
    }
  }

  async sendDelete(id: number) {
    await this.presentAlert(id);
  }

  sendCancel() {
    this.cancelNewProcess.emit();
  }
}
