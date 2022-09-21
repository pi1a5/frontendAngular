/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
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
  @Input() confirmedProcess: any = undefined;

  @Output() goBack = new EventEmitter<boolean>();

  public today: any = new Date().toISOString();

  public dateValue: any = null;

  public dateString: any = null;

  public selectedHours: string = '6';

  public documentsControl: any[] = [];

  public textArea: string = null;

  constructor(
    public router: Router,
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController,
  ) { }

  ngOnInit() {
    // console.log(this.confirmedProcess);
    this.createDocumentsArray();
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

  // formatDate(value: any) {
  //   this.dateValue = value;
  //   this.dateString = format(parseISO(value), 'dd/MM/yyyy');
  // }

  // selectHours(hours: string) {
  //   this.selectedHours = hours;
  // }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }

  submitTicket(formData: FormData) {
    this.apiStudent.sendTicket(formData).subscribe((data) => {
      // console.log(data);
      this.loadingController.dismiss();
      this.presentToast(data, 'success', 'checkmark-circle');
      this.router.navigate(['student'], { replaceUrl: true });
    }, (error) => {
      // console.log(error);
      this.loadingController.dismiss();
      this.presentToast(error.error, 'danger', 'close-circle');
      this.router.navigate(['student'], { replaceUrl: true });
    });
  }

  prepareData() {
    const formData: FormData = new FormData();
    // Files
    for (let index = 0; index < this.documentsControl.length; index++) {
      const document = this.documentsControl[index];
      formData.append(document.sigla, document.pdfFile);
    }
    // Body
    // formData.append('dataLimite', this.dateValue);
    formData.append('corpoTexto', this.textArea);
    formData.append('sub', localStorage.getItem('sub'));

    return formData;
  }

  async submit() {
    if (this.validate()) {
      await this.presentLoading();
      const formData = this.prepareData();
      this.submitTicket(formData);
    }
  }

  createDocumentsArray() {
    const documents = this.confirmedProcess.etapas[0].documentos;
    for (let index = 0; index < documents.length; index++) {
      this.documentsControl.push({
        nome: documents[index][0].nome,
        sigla: documents[index][0].sigla,
        pdfFile: undefined,
      });
    }
  }

  handleFileUpdate(doc: any, pdfFile: any) {
    for (let index = 0; index < this.documentsControl.length; index++) {
      if (this.documentsControl[index].sigla === doc.sigla) {
        this.documentsControl[index] = { nome: doc.nome, sigla: doc.sigla, pdfFile };
        return true;
      }
    }
    return false;
  }

  onFileChange(event: any, doc: any) {
    const pdfFiles = event.target.files;
    const pdfFile = pdfFiles.item(0);
    if (!this.handleFileUpdate(doc, pdfFile)) {
      this.documentsControl.push({
        nome: doc.nome,
        sigla: doc.sigla,
        pdfFile,
      });
    }
  }

  validate() {
    // if (!this.dateValue) {
    //   this.presentToast('Prazo limite obrigatório', 'danger', 'close-circle');
    //   return false;
    // }
    if (!this.textArea) {
      this.presentToast('Mensagem obrigatória', 'danger', 'close-circle');
      return false;
    }

    // Files
    for (let index = 0; index < this.documentsControl.length; index++) {
      if (this.documentsControl[index].pdfFile === undefined) {
        this.presentToast(`Documento ${this.documentsControl[index].nome} é obrigatório`, 'danger', 'close-circle');
        return false;
      }
    }

    return true;
  }
}
