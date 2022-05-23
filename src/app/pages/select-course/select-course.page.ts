import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.api.getCourses().subscribe(data => {
      this.list = data;
    }, error => {
      console.log(error);
    })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      spinner: 'crescent'
    });
    return await loading.present();
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

  loadIcon(id: number) {
    switch (id) {
      case 0:
        return 'desktop'
      case 1:
        return 'construct'
      case 2:
        return 'clipboard'
      case 3:
        return 'airplane'
      case 4:
        return 'bulb'
      default:
        break;
    }
  }

  async setCourse(idCourse: number) {
    await this.presentLoading();
    this.api.setCourse(idCourse).subscribe(data => {
      this.loadingController.dismiss();
      this.presentToast('Curso definido com sucesso', 'success', 'checkmark-circle');
      this.userPage(data.email);
    }, error => {
      console.log(error);
      this.loadingController.dismiss();
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
