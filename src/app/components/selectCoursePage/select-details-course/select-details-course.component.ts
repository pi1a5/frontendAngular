/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, OnInit, Output,
} from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-details-course',
  templateUrl: './select-details-course.component.html',
  styleUrls: ['./select-details-course.component.scss'],
})
export class SelectDetailsCourseComponent implements OnInit {
  public courses: any[] = [];

  public modalidades: any[] = [];

  public selectedCourse = undefined;

  @Output() confirmedCourse = new EventEmitter<Object>();

  constructor(
    public api: ApiService,
    public apiSupervisor: ApiSupervisorService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
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

  async presentAlert(curso: string) {
    const alert = await this.alertController.create({
      header: curso,
      message: 'Informe seu prontuário',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      inputs: [
        {
          placeholder: 'Nickname (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  async loadCourses() {
    this.apiSupervisor.getAreasWithCourses().subscribe(async (data) => {
      this.courses = data.areas;
      this.modalidades = data.modalidades;
    }, async (error) => {
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  async confirm() {
    const hours = await this.presentAlert(this.selectedCourse.nome);
    if (hours) await this.setCourse(this.selectedCourse.id, hours);
  }

  async setCourse(idCurso: number, prontuario: string) {
    await this.presentLoading();
    this.api.setCourseProntuario(idCurso, prontuario).subscribe((data) => {
      this.loadingController.dismiss();
      this.presentToast(data, 'success', 'checkmark-circle');
      this.sendConfirmedCourse();
    }, (error) => {
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  sendConfirmedCourse() {
    this.confirmedCourse.emit(this.selectedCourse);
  }

  receiveCourse(course: any) {
    this.selectedCourse = course;
  }
}
