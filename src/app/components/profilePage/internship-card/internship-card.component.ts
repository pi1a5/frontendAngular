/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-return-assign */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-internship-card',
  templateUrl: './internship-card.component.html',
  styleUrls: ['./internship-card.component.scss'],
})
export class InternshipCardComponent implements OnInit {
  public internship = undefined;

  public internshipProgress = 0;

  constructor(
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.apiStudent.getUserInternshipData().subscribe((data) => {
      // console.log(data);
      if (!data) {
        this.internship = null;
      } else {
        this.internship = data[0];
        this.internshipProgress = this.calculateProgress(data[0].necessario, data[0].cumprido);
      }
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    });
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

  calculateProgress(neededHours: number, completedHours: number) {
    this.internship.faltante = neededHours - completedHours;
    const progress = Math.round((completedHours * 100) / neededHours);
    return progress;
  }
}
