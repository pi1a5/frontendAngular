import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-acompanhamento',
  templateUrl: './acompanhamento.page.html',
  styleUrls: ['./acompanhamento.page.scss'],
})
export class AcompanhamentoPage implements OnInit {

  public arqRAE: any = null;
  public textArea: string = null;

  constructor(
    public router: Router,
    public apiStudent: ApiStudentService,
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
      this.apiStudent.sendTicketAcompanhamento(this.textArea, this.calculateDataLimite(), this.arqRAE).subscribe(data => {
        console.log(data);
        this.loadingController.dismiss();
        this.presentToast(data, 'success', 'checkmark-circle');
        this.router.navigate(['student'], { replaceUrl: true });
      }, error => {
        console.log(error);
        this.loadingController.dismiss();
        this.presentToast(error.error, 'danger', 'close-circle');
        this.router.navigate(['student'], { replaceUrl: true });
      });
    }

    return;
  }

  validate() {
    if (!this.textArea) {
      this.presentToast('Mensagem obrigatória', 'danger', 'close-circle');
      return false;
    }
    if (!this.arqRAE) {
      this.presentToast('RAE obrigatório', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  arqRae(files: FileList) {
    console.log('RAE: ', files.item(0)); 
    this.arqRAE = files.item(0);
  }

}
