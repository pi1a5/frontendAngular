import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.page.html',
  styleUrls: ['./select-course.page.scss'],
})
export class SelectCoursePage implements OnInit {

  private list: [];
  private idCourse: number = undefined;

  constructor(
    private router: Router,
    private api: ApiService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.api.getCourses().subscribe(data => {
      this.list = data;
    }, error => {
      console.log(error);
    })
  }

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      icon: icon,
      duration: 2000
    });
    toast.present();
  }

  setCourse(idCourse: number) {
    this.api.setCourse(idCourse, localStorage.getItem('sub')).subscribe(data => {
      this.presentToast('Curso definido com sucesso', 'success', 'checkmark-circle');
      this.userPage(data.email);
    }, error => {
      console.log(error);
      this.presentToast(error.error, 'danger', 'close-circle');
    })
  }

  userPage(email: string) {
    if (email.includes('aluno')) {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

}
