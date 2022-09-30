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
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
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

  public documents: any[] = [];

  constructor(
    public api: ApiService,
    public apiSupervisor: ApiSupervisorService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    // this.loadCourses();
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

  // async loadProcesses() {
  //   this.api.getAllCourses().subscribe(async (data) => {
  //     this.courses = data.processos;
  //     this.documents = data.documentos;
  //     this.courseNumber = this.courses.length;
  //   }, async (error) => {
  //     await this.presentToast(error.error, 'danger', 'close-circle');
  //   });
  // }

  newProcess() {
    this.isNewCourse = true;
    this.selectedCourse = {
      id: this.courseNumber,
      nome: 'Novo curso',
      cursos: [],
    };
  }

  // async saveNewCourse(course: any) {
  //   await this.presentLoading();
  //   this.apiSupervisor.newCourse(course).subscribe(async (data) => {
  //     await this.loadingController.dismiss();
  //     await this.presentToast('Area criada com sucesso!', 'success', 'checkmark-circle');
  //     this.courses.push(data.processo);
  //     this.reset();
  //   }, async (error) => {
  //     await this.loadingController.dismiss();
  //     await this.presentToast(error.error, 'danger', 'close-circle');
  //     this.reset();
  //   });
  // }

  // async saveEditedProcess(process: any) {
  //   await this.presentLoading();
  //   this.apiSupervisor.updateProcess(this.saveBeforeEdit, process).subscribe(async (data) => {
  //     await this.loadingController.dismiss();
  //     await this.presentToast(data, 'success', 'checkmark-circle');
  //     for (let index = 0; index < this.processes.length; index++) {
  //       if (this.processes[index].id === process.id) {
  //         this.processes[index] = process;
  //       }
  //     }
  //     this.reset();
  //   }, async (error) => {
  //     await this.loadingController.dismiss();
  //     await this.presentToast(error.error, 'danger', 'close-circle');
  //     this.reset();
  //   });
  // }

  receiveCourse(course: any) {
    this.selectedCourse = course;
    this.saveBeforeEdit = structuredClone(course);
  }

  // async receiveSaveEvent(course: any) {
  //   if (course.isNew) {
  //     this.saveNewProcess(course.process);
  //   } else {
  //     this.saveEditedProcess(course.process);
  //   }
  // }

  // async receiveDeleteEvent(id: number) {
  //   if (this.processes.length === 1) return await this.presentToast('Deverá ter pelo menos um processo', 'warning', 'warning-outline');

  //   await this.presentLoading();
  //   this.apiSupervisor.deleteProcess(id).subscribe(async (data) => {
  //     await this.loadingController.dismiss();
  //     await this.presentToast(data, 'success', 'checkmark-circle');
  //     this.processes = this.processes.filter((p) => p.id !== id);
  //     this.reset();
  //   }, async (error) => {
  //     await this.loadingController.dismiss();
  //     await this.presentToast(error.error, 'danger', 'close-circle');
  //     this.reset();
  //   });
  // }

  receiveCancelEvent() {
    this.reset();
  }

  reset() {
    this.isNewCourse = false;
    this.selectedCourse = undefined;
  }
}
