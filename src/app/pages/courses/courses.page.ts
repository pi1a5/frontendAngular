/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-return-await */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { ApiAdminService } from 'src/app/services/api-admin.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  public isNewCourse: boolean = false;

  public courses: any[] = [];

  public selectedCourse = undefined;

  public saveBeforeEdit = undefined;

  public courseNumber = 0;

  public modalidades: any[] = [];

  constructor(
    public api: ApiService,
    public apiAdmin: ApiAdminService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.loadCourses();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      spinner: 'crescent',
    });
    return await loading.present();
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

  async loadCourses() {
    this.apiAdmin.getAreasWithCourses().subscribe(async (data) => {
      this.courses = data.areas;
      this.modalidades = data.modalidades;
      this.courseNumber = this.courses.length;
    }, async (error) => {
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  newCourse() {
    this.isNewCourse = true;
    this.selectedCourse = {
      id: this.courseNumber,
      nome: 'Nova área',
      cursos: [],
    };
  }

  async saveNewCourse(course: any) {
    await this.presentLoading();
    this.apiAdmin.newArea(course).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast('Area criada com sucesso!', 'success', 'checkmark-circle');
      this.courses.push(data.area);
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  async saveEditedCourse(course: any) {
    await this.presentLoading();
    this.apiAdmin.updateArea(this.saveBeforeEdit, course).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast(data, 'success', 'checkmark-circle');
      for (let index = 0; index < this.courses.length; index++) {
        if (this.courses[index].id === course.id) {
          this.courses[index] = course;
        }
      }
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  verifyObjects(oldObj: any, newObj: any) {
    const aProps = Object.getOwnPropertyNames(oldObj);
    const bProps = Object.getOwnPropertyNames(newObj);

    // Verificar se o número de propriedades é igual
    if (aProps.length !== bProps.length) {
      return false;
    }

    for (let i = 0; i < aProps.length; i++) {
      const propName = aProps[i];

      // Verificar se os valores da mesma propriedade são iguais
      if (JSON.stringify(oldObj[propName]) !== JSON.stringify(newObj[propName])) {
        return false;
      }
    }

    // São iguais
    return true;
  }

  receiveCourse(course: any) {
    this.selectedCourse = course;
    this.saveBeforeEdit = structuredClone(course);
  }

  async receiveSaveEvent(course: any) {
    // Verificar se os objetos são diferentes
    if (this.verifyObjects(this.saveBeforeEdit, course.course)) return await this.presentToast('Não foi identificado nenhuma mudança', 'warning', 'warning-outline');

    if (course.isNew) {
      this.saveNewCourse(course.course);
    } else {
      this.saveEditedCourse(course.course);
    }
  }

  async receiveDeleteEvent(id: number) {
    if (this.courses.length === 1) return await this.presentToast('Deverá ter pelo menos um processo', 'warning', 'warning-outline');
    await this.presentLoading();
    this.apiAdmin.deleteArea(id).subscribe(async (data) => {
      await this.loadingController.dismiss();
      await this.presentToast(data, 'success', 'checkmark-circle');
      this.courses = this.courses.filter((p) => p.id !== id);
      this.reset();
    }, async (error) => {
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.reset();
    });
  }

  receiveCancelEvent() {
    this.reset();
  }

  reset() {
    this.isNewCourse = false;
    this.selectedCourse = undefined;
  }
}
