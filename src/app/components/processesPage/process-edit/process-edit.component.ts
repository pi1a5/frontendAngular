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

import { ItemReorderCustomEvent, ModalController, ToastController } from '@ionic/angular';

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
    public toastController: ToastController,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.editProcess = {
      id: this.process.id,
      nome: this.process.nome,
      etapas: this.process.etapas,
    };
    this.stepNumber = this.process.etapas.length;
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

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      color,
      icon,
      duration: 2000,
    });
    toast.present();
  }

  onChangeName(value: any) {
    if (value) {
      this.editProcess.nome = value;
    } else {
      this.editProcess.nome = this.process.nome;
    }
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

  sendSave() {
    this.saveProcess.emit({ isNew: this.newProcess, process: this.editProcess });
  }

  sendDelete(id: number) {
    this.deleteProcess.emit(id);
  }

  sendCancel() {
    this.cancelNewProcess.emit();
  }
}
