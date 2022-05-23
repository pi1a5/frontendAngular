import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-fim-de-estagio',
  templateUrl: './fim-de-estagio.page.html',
  styleUrls: ['./fim-de-estagio.page.scss'],
})
export class FimDeEstagioPage implements OnInit {

  private arqTRE: any = null;
  private textArea: string = null;

  constructor(
    private router: Router,
    private apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
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

  calculateDataLimite() {
    var mes: any = new Date().getMonth();
    mes = mes + 2
    if (mes < 10 ) {
      mes = '0' + mes
    }
    if (mes > 12) {
      mes = '01'
    }
   
    return `${new Date().getFullYear()}-${mes}-${29}`;     
  }

  async submit() {
    if (this.validate()) {
      await this.presentLoading();
      this.apiStudent.sendTicketFim(this.textArea, this.calculateDataLimite(), this.arqTRE).subscribe(data => {
        console.log(data);
        this.loadingController.dismiss();
        this.presentToast(data, 'success', 'checkmark-circle');
        this.router.navigate(['student'], { replaceUrl: true });
      }, error => {
        console.log(error);
        this.loadingController.dismiss();
        this.presentToast(error.error, 'danger', 'close-circle');
        this.router.navigate(['student'], { replaceUrl: true });
      })
    }

    return;
  }

  validate() {
    if (!this.textArea) {
      this.presentToast('Mensagem obrigatória', 'danger', 'close-circle');
      return false;
    }
    if (!this.arqTRE) {
      this.presentToast('TRE obrigatório', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  arqTre(files: FileList) {
    console.log('TRE: ', files.item(0)); 
    this.arqTRE = files.item(0);
  }

}
