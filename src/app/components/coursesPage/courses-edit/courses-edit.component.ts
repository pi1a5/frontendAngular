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
import { SubcourseEditComponent } from '../subcourse-edit/subcourse-edit.component';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.scss'],
})
export class CoursesEditComponent implements OnInit {
  @Input() newCourse: boolean = false;

  @Input() course: any = undefined;

  @Output() saveCourse = new EventEmitter<any>();

  @Output() deleteCourse = new EventEmitter<number>();

  @Output() cancelNewCourse = new EventEmitter<string>();

  public editCourse: any = undefined;

  public subcourseNumber = 0;

  constructor(
    public modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.course);
    this.editCourse = {
      id: this.course.id,
      nome: this.course.nome,
      cursos: this.course.cursos,
    };
    this.subcourseNumber = this.course.cursos.length;
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

  async presentModal(subcourse, newSubcourse) {
    const modal = await this.modalController.create({
      component: SubcourseEditComponent,
      componentProps: {
        subcourse,
        newSubcourse,
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
      subHeader: 'Ao excluir uma área você não poderá recuperá-la.',
      message: 'Deseja mesmo excluir essa área?',
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
            this.deleteCourse.emit(id);
          },
        },
      ],
    });

    await alert.present();
  }

  onChangeName(value: any) {
    this.editCourse.nome = value;
  }

  async editSubcourse(subcourse: any) {
    this.handleModalResponse(await this.presentModal(subcourse, false));
  }

  deleteSubcourse(subcourseId: number) {
    this.editCourse.etapas = this.editCourse.etapas.filter((s) => s.id !== subcourseId);
  }

  async newSubcourse() {
    const subcourse = {
      id: this.course.subcourses.length,
      nome: 'Novo curso',
      cargaHoraria: 0,
      areaId: this.course.id,
      tipo: 'algum tipo',
    };

    this.handleModalResponse(await this.presentModal(subcourse, true));
  }

  handleModalResponse(response) {
    if (!response) return;

    if (response.novoSubcourse) {
      this.editCourse.subcourses.push(response.subcourse);
      this.subcourseNumber++;
    } else {
      for (let index = 0; index < this.editCourse.subcourses.length; index++) {
        if (this.editCourse.subcourses[index].id === response.subcourse.id) {
          this.editCourse.subcourses[index] = response.subcourse;
        }
      }
    }
  }

  validate() {
    // Verificar se tem no mínimo 3 dígitos sem contar espaços em branco
    if (this.editCourse.nome.trim().length < 3) {
      this.presentToast('Nome do processo deve conter no mínimo 3 caracteres', 'danger', 'close-circle');
      return false;
    }
    // Verificar se tem pelo menos 1 etapa
    if (this.editCourse.etapas.length <= 0) {
      this.presentToast('Processo deve conter pelo menos 1 etapa', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  sendSave() {
    if (this.validate()) {
      this.saveCourse.emit({ isNew: this.newCourse, process: this.editCourse });
    }
  }

  sendDelete(id: number) {
    this.presentAlert(id);
  }

  sendCancel() {
    this.cancelNewCourse.emit();
  }
}
