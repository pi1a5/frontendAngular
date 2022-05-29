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

  public formData: FormData = new FormData();
  public today: any = new Date().toISOString();
  public dateValue: any = null;
  public dateString: any = null;
  public arqTCE: any = null;
  public arqPA: any = null;
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

  formatDate(value: any) {
    this.dateValue = format(parseISO(value), 'yyyy-MM-dd');;
    this.dateString = format(parseISO(value), 'dd/MM/yyyy');
  }

  async submit() {
    if (this.validate()) {

      await this.presentLoading();

      // Files
      this.formData.append('tce', this.arqTCE);
      this.formData.append('pa', this.arqPA);
      // Body
      this.formData.append('corpo_texto', this.textArea);
      this.formData.append('data_limite', this.dateValue);
      this.formData.append('sub', localStorage.getItem('sub'));
      this.formData.append('eProfessor', 'false');
  
      this.apiStudent.sendTicketInicio(this.formData).subscribe(data => {
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
    const pdfFiles = event.target.files;
    const pdfFile = pdfFiles.item(0);

    this.arqTCE = pdfFile;
  }

  arqPa(event: any) {
    const pdfFiles = event.target.files;
    const pdfFile = pdfFiles.item(0);

    this.arqPA = pdfFile;
  }

}
