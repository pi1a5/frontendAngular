import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-fase-edit',
  templateUrl: './fase-edit.component.html',
  styleUrls: ['./fase-edit.component.scss'],
})
export class FaseEditComponent implements OnInit {

  public etapa: any = undefined;
  public documentos: any[] = [];

  public editFase: any = undefined;

  currentDocuments = undefined;
  customAlertOptions = {
    header: 'Documentos cadastrados',
    message: 'Selecione os documentos dessa etapa',
    translucent: true,
  };

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.editFase = {
      id: this.etapa.id,
      nome: this.etapa.nome,
      prazo: this.etapa.prazo,
      documentos: this.etapa.documentos
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
      this.editFase.nome = value;
    } else {
      this.editFase.nome = this.etapa.nome;
    }
  }

  onDeadlineChange(ev: Event) {
    this.editFase.prazo = (ev as CustomEvent).detail.value;
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
    if (this.editFase.nome.trim().length < 3) {
      this.presentToast('Nome da etapa deve conter no mínimo 3 dígitos', 'danger', 'close-circle');
      return false;
    }
    return true;
  }

  compareWith(o1, o2) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  }

  handleChangeDocuments(ev) {       
    for (let index = 0; index < ev.target.value.length; index++) {
      this.editFase.documentos.push(ev.target.value[index]);
    }
  }

  


}
