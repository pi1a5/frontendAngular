import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-inicio-de-estagio',
  templateUrl: './inicio-de-estagio.page.html',
  styleUrls: ['./inicio-de-estagio.page.scss'],
})
export class InicioDeEstagioPage implements OnInit {


  private dateValue: any = null;
  private dateString: any = null;
  private arqTCE: any = 'exemploarquivoTCE';
  private arqPA: any = 'exemploarquivoPA';
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

  formatDate(value: any) {
    this.dateValue = format(parseISO(value), 'yyyy-MM-dd');;
    this.dateString = format(parseISO(value), 'dd/MM/yyyy');
  }

  async submit() {
    await this.presentLoading();
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
