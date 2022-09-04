import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ItemReorderCustomEvent, ModalController } from '@ionic/angular';
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

  constructor(
    public modalController: ModalController,
  ) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.editProcess = {
      id: this.process.id,
      name: this.process.name,
      fases: this.process.fases
    };
  }

  async presentModal(fase, documents) {
    const modal = await this.modalController.create({
      component: FaseEditComponent,
      componentProps: {
        fase: fase,
        documents: documents
      },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) return data;

    return false;
  }

  onChangeName(value: any) {
    if (value) {
      this.editProcess.name = value;
    } else {
      this.editProcess.name = this.process.name;
    }
  }

  reorderFases(ev: ItemReorderCustomEvent) {
    ev.detail.complete(true);
    const faseToMove = this.editProcess.fases.splice(ev.detail.from, 1)[0];
    this.editProcess.fases.splice(ev.detail.to, 0, faseToMove);
  }

  async editFase(fase: any) {
    // const resp = await this.presentModal(fase);
    // if (!resp) return console.log('cancel');
    // console.log(resp);
  }

  deleteFase(faseId: number) {
    this.editProcess.fases = this.editProcess.fases.filter(f => f.id !== faseId);
  }

  async newFase() {

    const fase = {
      id: this.process.fases.length,
      name: 'Nova etapa',
      deadline: 10,
      documents: []
    }
    const documents = this.documents;


    const resp = await this.presentModal(fase, documents);
    if (!resp) return console.log('cancel');
    console.log(resp);
    // this.fases.push({
    //   id: this.faseId,
    //   name: 'Nova Etapa'
    // });
    // this.faseId++;
  }

  confirm() {
    console.log(this.editProcess);
  }

  sendDelete(id: number) {
    this.deleteProcess.emit(id);
  }

  sendCancel() {
    this.cancelNewProcess.emit();
  }

}
