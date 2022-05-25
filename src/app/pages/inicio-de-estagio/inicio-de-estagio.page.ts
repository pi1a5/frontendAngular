import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';
import { S3Service } from 'src/app/services/s3.service';

@Component({
  selector: 'app-inicio-de-estagio',
  templateUrl: './inicio-de-estagio.page.html',
  styleUrls: ['./inicio-de-estagio.page.scss'],
})
export class InicioDeEstagioPage implements OnInit {

  private today: any = new Date().toISOString();
  private dateValue: any = null;
  private dateString: any = null;
  private arqTCE: any = null;
  private arqPA: any = null;
  private textArea: string = null;

  constructor(
    private router: Router,
    private apiStudent: ApiStudentService,
    private s3: S3Service,
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

  formatDate(value: any) {
    this.dateValue = format(parseISO(value), 'yyyy-MM-dd');;
    this.dateString = format(parseISO(value), 'dd/MM/yyyy');
  }

  async submit() {
    if (this.validate()) {
      await this.presentLoading();
      await this.uploadS3();
      this.uploadApi();
    }

    return;
  }

  validate() {
    if (!this.dateValue) {
      this.presentToast('Data obrigatória', 'danger', 'close-circle');
      return false;
    }
    if (!this.arqTCE) {
      this.presentToast('TCE obrigatório', 'danger', 'close-circle');
      return false;
    }
    if (!this.arqPA) {
      this.presentToast('PA obrigatório', 'danger', 'close-circle');
      return false;
    }
    if (!this.textArea) {
      this.presentToast('Mensagem obrigatória', 'danger', 'close-circle');
      return false;
    }

    return true;
  }

  arqTce(event: any) {
    if (event.target.value) {
      this.arqTCE = event.target.files[0];
    } else {
      console.log('There is no file');
    }
  }

  arqPa(event: any) {
    if (event.target.value) {
      this.arqPA = event.target.files[0];
    } else {
      console.log('There is no file');
    }
  }

  async uploadS3() {
    // s3
    await this.s3.uploadFile(this.arqTCE);
    await this.s3.uploadFile(this.arqPA);
  }

  uploadApi() {

    // api 
    console.log('nome', this.s3.getFiles())
    

    this.apiStudent.sendTicketInicio(this.textArea, this.dateValue, this.arqTCE, this.arqPA).subscribe(data => {
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

}
