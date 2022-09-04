import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fase-edit',
  templateUrl: './fase-edit.component.html',
  styleUrls: ['./fase-edit.component.scss'],
})
export class FaseEditComponent implements OnInit {

  public fase: any = undefined;
  public documents: any[] = [];

  public editFase: any = undefined;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.editFase = {
      id: this.fase.id,
      name: this.fase.name,
      deadline: this.fase.deadline,
      documents: this.fase.documents
    };
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

  onChangeName(value: string) {
    if (value) {
      this.editFase.name = value;
    } else {
      this.editFase.name = this.fase.name;
    }
  }

  onDeadlineChange(ev: Event) {
    this.editFase.deadline = (ev as CustomEvent).detail.value;
  }

  async confirm() {
    if (this.validate()) {
      this.modalController.dismiss(this.editFase);
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  validate() {
    // Verificar se tem no mínimo 3 dígitos sem contar espaços em branco
    if (this.editFase.name.trim().length < 3) {
      this.presentToast('Nome da etapa deve conter no mínimo 3 dígitos', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

}
