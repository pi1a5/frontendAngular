/* eslint-disable linebreak-style */
/* eslint-disable no-restricted-syntax */
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
  Component, Input, OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ApiStudentService } from 'src/app/services/api-student.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() confirmedProcess: any = undefined;

  @Input() confirmedProcessFromBack: any = undefined;

  public step: any = undefined;

  public today: any = new Date().toISOString();

  public dateValue: any = null;

  public dateString: any = null;

  public selectedHours: string = '6';

  public documentsControl: any[] = [];

  public textArea: string = '';

  constructor(
    public router: Router,
    public apiStudent: ApiStudentService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    // console.log(this.confirmedProcessFromBack);
    this.defineOrigin();
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Coloque os dias trabalhados',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
        },
      ],
      inputs: [
        {
          label: 'Dias trabalhados',
          type: 'number',
        },
      ],
    });

    await alert.present();

    const input = await alert.onDidDismiss();

    if (input.role === 'confirm') return input.data.values;

    return false;
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }

  async submitTicket(formData: FormData) {
    await this.presentLoading();
    this.apiStudent.sendTicket(formData).subscribe(async (data) => {
      // console.log(data);
      await this.loadingController.dismiss();
      await this.presentToast(data, 'success', 'checkmark-circle');
      this.router.navigate(['student'], { replaceUrl: true });
    }, async (error) => {
      // console.log(error);
      await this.loadingController.dismiss();
      await this.presentToast(error.error, 'danger', 'close-circle');
      this.router.navigate(['student'], { replaceUrl: true });
    });
  }

  async prepareData() {
    const formData: FormData = new FormData();
    // Files
    for (let index = 0; index < this.documentsControl.length; index++) {
      const document = this.documentsControl[index];
      formData.append(document.sigla, document.pdfFile);
    }
    // Body
    // formData.append('dataLimite', this.dateValue);
    formData.append('corpoTexto', this.textArea);
    formData.append('sub', sessionStorage.getItem('userId'));
    if (this.step.loop) {
      const days = await this.presentAlert();
      if (!days) return false;
      formData.append('diastrabalhados', `${days}`);
      return formData;
    }
    const days = 0;
    formData.append('diastrabalhados', `${days}`);

    return formData;
  }

  async submit() {
    if (this.validate()) {
      const formData = await this.prepareData();
      if (!formData) return false;
      await this.submitTicket(formData);
    }
  }

  defineOrigin() {
    if (this.confirmedProcessFromBack) {
      this.getCurrentStep();
    } else {
      this.createDocumentsArray(this.confirmedProcess.etapas[0]);
    }
  }

  getCurrentStep() {
    for (const i in this.confirmedProcessFromBack.etapas) {
      if (this.confirmedProcessFromBack.etapas[i].atual === true) {
        const step = this.confirmedProcessFromBack.etapas[i];
        console.log(step);
        this.createDocumentsArray(step);
        break;
      }
    }
  }

  createDocumentsArray(step: any) {
    this.step = step;
    const documents = step.documentos;
    for (let index = 0; index < documents.length; index++) {
      this.documentsControl.push({
        nome: documents[index].nome,
        sigla: documents[index].sigla,
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

    if (this.textArea.length < 100) {
      this.presentToast('A mensagem deve conter no mínimo 100 caracteres', 'danger', 'close-circle');
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

  // formatDate(value: any) {
  //   this.dateValue = value;
  //   this.dateString = format(parseISO(value), 'dd/MM/yyyy');
  // }

  // selectHours(hours: string) {
  //   this.selectedHours = hours;
  // }
}
