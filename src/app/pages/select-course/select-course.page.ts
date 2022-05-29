import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SetProntuarioComponent } from 'src/app/components/set-prontuario/set-prontuario.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-select-course',
  templateUrl: './select-course.page.html',
  styleUrls: ['./select-course.page.scss'],
})
export class SelectCoursePage implements OnInit {

  public list: [any];
  public idCourse: number = undefined;

  constructor(
    public router: Router,
    public api: ApiService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public modalController: ModalController
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

  async presentModal(course: any) {
    var modal = await this.modalController.create({
      component: SetProntuarioComponent,
      cssClass: 'set-prontuario',
      componentProps: { course }
    });

    await this.loadingController.dismiss();
    await modal.present();

    var { data } = await modal.onDidDismiss();

    if (data) return data

    return false;
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

  async setCourse(course: any) {
    await this.presentLoading();
    this.idCourse = course.id;
    const resp = await this.presentModal(course);
    if (!resp) return;
    await this.presentLoading();
    this.api.setCourseProntuario(this.idCourse, resp.prontuario).subscribe(async data => {
      await this.loadingController.dismiss();
      await this.presentToast('Bem-vindo!', 'success', 'checkmark-circle');
      this.userPage(data.email);
    }, async error => {
      console.log(error);
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
    });
  }

  userPage(email: string) {
    if (email.includes('aluno')) {
      this.router.navigate(['student'], { replaceUrl: true });
    } else {
      this.router.navigate(['supervisor'], { replaceUrl: true });
    }
  }

}
