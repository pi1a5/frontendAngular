/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTicketTypePageRoutingModule } from './select-ticket-type-routing.module';

import { SelectTicketTypePage } from './select-ticket-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectTicketTypePageRoutingModule,
  ],
  declarations: [SelectTicketTypePage],
})
export class SelectTicketTypePageModule {}
