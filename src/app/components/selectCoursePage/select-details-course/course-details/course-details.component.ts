/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, Input, OnInit, SimpleChanges,
} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {
  @Input() course: any = undefined;

  @Input() modalidades: any = undefined;

  public courseModalidade: any[] = [];

  constructor(
    public toastController: ToastController,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.filterModalidades();
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

  filterModalidades() {
    this.courseModalidade = [];
    for (let index = 0; index < this.course.curso.length; index++) {
      const curso = this.course.curso[index];
      const obj = {
        nome: curso.nome,
        modalidade: this.modalidades.filter((m) => m.id === curso.idmodalidade)[0].nome,
      };
      this.courseModalidade.push(obj);
    }
  }
}
