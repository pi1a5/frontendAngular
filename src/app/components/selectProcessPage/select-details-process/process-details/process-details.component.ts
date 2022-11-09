/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
import {
  Component, Input, OnInit, SimpleChanges,
} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-process-details',
  templateUrl: './process-details.component.html',
  styleUrls: ['./process-details.component.scss'],
})
export class ProcessDetailsComponent implements OnInit {
  @Input() process: any = undefined;

  documents = [];

  constructor(
    public toastController: ToastController,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.documents = [];
    for (let index = 0; index < this.process.etapas.length; index++) {
      const element = this.process.etapas[index].documentos;
      // console.log(element);
      for (let i = 0; i < element.length; i++) {
        const doc = element[i];
        // console.log(doc);
        this.documents.push(doc);
      }
    }
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

  downloadTemplate(template: string) {
    this.presentToast('Not implemented', 'danger', 'close');
  }
}
