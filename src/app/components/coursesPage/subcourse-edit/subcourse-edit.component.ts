/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
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

  public modalidades: any[] = [];

  public newSubcourse: boolean = false;

  public editSubcourse: any = undefined;

  constructor(
    public modalController: ModalController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    // console.log(this.subcourse);
    this.editSubcourse = {
      id: this.subcourse.id,
      nome: this.subcourse.nome,
      carga: this.subcourse.carga,
      idarea: this.subcourse.idarea,
      modalidade: this.modalidades.filter((m) => m.id === this.subcourse.idmodalidade)[0],
      idmodalidade: this.subcourse.idmodalidade,
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
    this.editSubcourse.nome = value;
  }

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
    // Verificar se tem no mínimo 5 dígitos sem contar espaços em branco
    if (this.editSubcourse.nome.trim().length < 5) {
      this.presentToast('Nome do curso deve conter no mínimo 5 caracteres', 'danger', 'close-circle');
      return false;
    }

    // Verificar se a carga horária é superior a 300 horas
    if (this.editSubcourse.carga < 300) {
      this.presentToast('Carga Horária deverá ser superior a 300 horas', 'danger', 'close-circle');
      return false;
    }

    // Verificar se tem uma modalidade atribuída
    if (!this.editSubcourse.modalidade) {
      this.presentToast('Curso deve conter uma modalidade atribuída', 'danger', 'close-circle');
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

  handleChangeModalidade(ev) {
    // console.log( ev.target.value);
    this.editSubcourse.idmodalidade = ev.target.value.id;
    this.editSubcourse.modalidade = this.modalidades.filter((m) => m.id === this.editSubcourse.idmodalidade)[0];
    // console.log(this.editSubcourse.modalidade);
  }
}
