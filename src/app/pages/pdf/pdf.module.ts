/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfPageRoutingModule } from './pdf-routing.module';

import { PdfPage } from './pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfPageRoutingModule,
    NgxExtendedPdfViewerModule,
  ],
  declarations: [PdfPage],
})
export class PdfPageModule {}
