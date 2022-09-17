/* eslint-disable no-return-await */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import {
  Component, EventEmitter, Input, OnInit, Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() confirmedProcess: Object = undefined;

  @Output() goBack = new EventEmitter<boolean>();

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
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    console.log(this.confirmedProcess);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'loading',
      message: 'Carregando...',
      spinner: 'crescent',
    });
    return await loading.present();
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

  sendGoBack() {
    this.goBack.emit();
  }

  saveProcess() {
    console.log(this.formData);
  }

  formatDate(value: any) {
    this.dateValue = value;
    // this.dateValue = format(parseISO(value), 'yyyy-MM-dd');
    this.dateString = format(parseISO(value), 'dd/MM/yyyy');
  }

  async submit() {
    if (this.validate()) {
      await this.presentLoading();

      // Files
      this.formData.append('tce', this.arqTCE);
      this.formData.append('pa', this.arqPA);
      // Body
      this.formData.append('corpoTexto', this.textArea);
      this.formData.append('dataLimite', this.dateValue);
      this.formData.append('sub', localStorage.getItem('sub'));
      this.formData.append('eProfessor', 'false');

      this.apiStudent.sendTicketInicio(this.formData).subscribe((data) => {
        console.log(data);
        this.loadingController.dismiss();
        this.presentToast(data, 'success', 'checkmark-circle');
        this.router.navigate(['student'], { replaceUrl: true });
      }, (error) => {
        console.log(error);
        this.loadingController.dismiss();
        this.presentToast(error.error, 'danger', 'close-circle');
        this.router.navigate(['student'], { replaceUrl: true });
      });
    }
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
