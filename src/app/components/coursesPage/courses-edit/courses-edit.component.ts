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

  @Input() modalidades: any[] = [];

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

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    this.editCourse = {
      id: this.course.id,
      nome: this.course.nome,
      curso: this.course.curso,
    };
    this.subcourseNumber = this.course.curso.length;
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

  async presentModal(subcourse, modalidades, newSubcourse) {
    const modal = await this.modalController.create({
      component: SubcourseEditComponent,
      componentProps: {
        subcourse,
        modalidades,
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
    this.handleModalResponse(await this.presentModal(subcourse, this.modalidades, false));
  }

  deleteSubcourse(subcourseId: number) {
    this.editCourse.curso = this.editCourse.curso.filter((c) => c.id !== subcourseId);
  }

  async newSubcourse() {
    const subcourse = {
      id: this.course.curso.length,
      nome: '',
      carga: 0,
      idarea: this.course.id,
      idmodalidade: this.modalidades[0].id,
    };

    this.handleModalResponse(await this.presentModal(subcourse, this.modalidades, true));
  }

  handleModalResponse(response) {
    if (!response) return;

    if (response.newSubcourse) {
      this.editCourse.curso.push(response.subcourse);
      this.subcourseNumber++;
    } else {
      for (let index = 0; index < this.editCourse.curso.length; index++) {
        if (this.editCourse.curso[index].id === response.subcourse.id) {
          this.editCourse.curso[index] = response.subcourse;
        }
      }
    }
  }

  validate() {
    // Verificar se tem no mínimo 5 dígitos sem contar espaços em branco
    if (this.editCourse.nome.trim().length < 5) {
      this.presentToast('Nome da área deve conter no mínimo 5 caracteres', 'danger', 'close-circle');
      return false;
    }
    // Verificar se tem pelo menos 1 curso
    if (this.editCourse.curso.length <= 0) {
      this.presentToast('Área deve conter pelo menos 1 curso', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  sendSave() {
    if (this.validate()) {
      this.saveCourse.emit({ isNew: this.newCourse, course: this.editCourse });
    }
  }

  sendDelete(id: number) {
    this.presentAlert(id);
  }

  sendCancel() {
    this.cancelNewCourse.emit();
  }
}
