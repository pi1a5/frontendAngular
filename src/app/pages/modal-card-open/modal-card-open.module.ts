/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCardOpenPageRoutingModule } from './modal-card-open-routing.module';

import { ModalCardOpenPage } from './modal-card-open.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCardOpenPageRoutingModule,
  ],
  declarations: [ModalCardOpenPage],
})
export class ModalCardOpenPageModule {}
