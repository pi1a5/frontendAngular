/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-subcourse-edit',
  templateUrl: './subcourse-edit.component.html',
  styleUrls: ['./subcourse-edit.component.scss'],
})
export class SubcourseEditComponent implements OnInit {
  public subcourse: any = undefined;

  public newSubcourse: boolean = false;

  public editSubcourse: any = undefined;

  // currentDocuments = undefined;

  // customAlertOptions = {
  //   header: 'Documentos cadastrados',
  //   message: 'Selecione os documentos dessa etapa',
  //   translucent: true,
  // };

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.editSubcourse = {
      id: this.subcourse.id,
      nome: this.subcourse.nome,
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
      this.editSubcourse.nome = value;
    } else {
      this.editSubcourse.nome = this.subcourse.nome;
    }
  }

  // onDeadlineChange(ev: Event) {
  //   this.editSubcourse.prazo = (ev as CustomEvent).detail.value;
  // }

  async confirm() {
    if (this.validate()) {
      this.modalController.dismiss({
        newSubcourse: this.newSubcourse,
        subcourse: this.editSubcourse,
      });
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  validate() {
    // Verificar se tem no mínimo 3 dígitos sem contar espaços em branco
    if (this.editSubcourse.nome.trim().length < 3) {
      this.presentToast('Nome da etapa deve conter no mínimo 3 caracteres', 'danger', 'close-circle');
      return false;
    }

    // Verificar se tem pelo menos 1 documento
    if (this.editSubcourse.documentos.length <= 0) {
      this.presentToast('Etapa deve conter pelo menos 1 documento', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  // compareWith(o1, o2) {
  //   if (!o1 || !o2) {
  //     return o1 === o2;
  //   }

  //   if (Array.isArray(o2)) {
  //     return o2.some((o) => o.id === o1.id);
  //   }

  //   return o1.id === o2.id;
  // }

  // handleChangeCheckbox(ev) {
  //   this.editSubcourse.loop = ev;
  // }

  // handleChangeDocuments(ev) {
  //   this.editSubcourse.documentos = ev.target.value;
  // }
}
