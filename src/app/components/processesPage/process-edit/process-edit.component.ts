import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemReorderCustomEvent, ModalController } from '@ionic/angular';
import { FaseEditComponent } from '../fase-edit/fase-edit.component';

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.scss'],
})
export class ProcessEditComponent implements OnInit {

  @Input() newProcess: boolean = false;
  @Input() processData: any;
  @Output() cancelNewProcess = new EventEmitter<string>();

  public fases: any[];
  public faseId: number = 0;

  constructor(public modalController: ModalController,) {
    this.fases = []
  }

  ngOnInit() { }

  async presentModal(fase: any) {
    const modal = await this.modalController.create({
      component: FaseEditComponent,
      // cssClass: 'set-prontuario',
      componentProps: { fase },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) return data;

    return false;
  }

  async editFase(fase: any) {
    const resp = await this.presentModal(fase);
    if (!resp) return console.log('cancel');
    console.log(resp);
  }

  reorderFases(ev: ItemReorderCustomEvent) {
    ev.detail.complete(true);
    let faseToMove = this.fases.splice(ev.detail.from, 1)[0];
    this.fases.splice(ev.detail.to, 0, faseToMove);
  }

  async newFase() {
    const fase = {
      id: this.faseId,
      name: 'Nova Etapa'
    }

    const resp = await this.presentModal(fase);
    if (!resp) return console.log('cancel');
    console.log(resp);
    // this.fases.push({
    //   id: this.faseId,
    //   name: 'Nova Etapa'
    // });
    // this.faseId++;
  }

  deleteFase(faseId: number) {
    this.fases = this.fases.filter(f => f.id !== faseId);
  }

  confirm() {
    console.log(this.fases);
  }

  sendCancel() {
    this.cancelNewProcess.emit();
  }

}
