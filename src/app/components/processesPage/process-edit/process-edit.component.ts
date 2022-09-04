import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ItemReorderCustomEvent, ModalController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
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
  @Output() deleteProcess = new EventEmitter<number>();
  @Output() cancelNewProcess = new EventEmitter<string>();

  public editProcess: any = undefined;

  public stepNumber = 0;

  constructor(
    public modalController: ModalController,
    public apiSupervisor: ApiSupervisorService,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.editProcess = {
      id: this.process.id,
      nome: this.process.nome,
      etapas: this.process.etapas
    };
    this.stepNumber = this.process.etapas.length;
  }

  async presentModal(etapa, documentos) {
    const modal = await this.modalController.create({
      component: FaseEditComponent,
      componentProps: {
        etapa: etapa,
        documentos: documentos
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) return data;

    return false;
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
    const resp = await this.presentModal(step, this.documents);
    if (!resp) return console.log('cancel');
    this.editProcess.etapas.pop(resp.id);
    this.editProcess.etapas.push(resp);
  }

  deleteFase(faseId: number) {
    this.editProcess.etapas = this.editProcess.etapas.filter(f => f.id !== faseId);
  }

  async newFase() {

    const etapa = {
      id: this.process.etapas.length,
      nome: 'Nova etapa',
      prazo: 10,
      documentos: []
    }
    const documentos = this.documents;

    const resp = await this.presentModal(etapa, documentos);
    if (!resp) return console.log('cancel');
    this.editProcess.etapas.push(resp);
    this.stepNumber++;
  }

  confirm() {
    console.log(this.editProcess);
    // this.apiSupervisor.newProcess(this.editProcess).subscribe(data => {
    //   console.log(data);
    //   this.sendCancel();
    // })
  }

  sendDelete(id: number) {
    this.deleteProcess.emit(id);
  }

  sendCancel() {
    this.cancelNewProcess.emit();
  }

}
