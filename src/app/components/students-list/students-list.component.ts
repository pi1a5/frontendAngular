/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController, AlertController } from '@ionic/angular';
import { ApiAdminService } from 'src/app/services/api-admin.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent implements OnInit {
  public searchTerm: string;

  public students: any = undefined;

  public addButton: boolean = true;

  constructor(
    public apiAdmin: ApiAdminService,
    public modalController: ModalController,
    public toastController: ToastController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.loadStudents();
  }

  // async presentAlert(id: number, supervisorName: string) {
  //   const alert = await this.alertController.create({
  //     header: 'Cuidado!',
  //     subHeader: `Tem certeza que deseja excluir ${supervisorName} permanentemente?`,
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: () => { },
  //       },
  //       {
  //         text: 'Sim, desejo',
  //         role: 'confirm',
  //         handler: () => {
  //           this.deleteSupervisor(id);
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      color,
      icon,
      duration: 2000,
    });
    toast.present();
  }

  loadStudents() {
    this.apiAdmin.getStudents().subscribe((data) => {
      // console.log(data);
      this.students = data;
      this.addButton = false;
    }, (error) => {
      // console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  addSupervisor(id: number) {
    this.apiAdmin.createRandomSupervisorForStudent(id).subscribe(data => {
      console.log(data);
      this.loadStudents();
    }, error => {
      this.presentToast(error.error, 'danger', 'close-circle');
    })
  }

  addStudent() {
    this.addButton = true;
    this.apiAdmin.createRandomStudent().subscribe((data) => {
      this.loadStudents();
    }, (error) => {
      this.addButton = false;
      this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  createTicket(id: number) {
    this.addButton = true;
    this.apiAdmin.createTicketForRandomStudent(id).subscribe(data => {
      console.log(data);
      this.loadStudents();
    }, error => {
      this.addButton = false;
      this.presentToast(error.error, 'danger', 'close-circle');
    })
  }
}
