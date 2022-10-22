/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { PendingTicketComponent } from 'src/app/components/pending-ticket/pending-ticket.component';
import { ModalTicketClosedComponent } from 'src/app/components/modal-ticket-closed/modal-ticket-closed.component';
import { LateWarningComponent } from 'src/app/components/late-warning/late-warning.component';
import { StudentPage } from './student.page';
import { StudentPageRoutingModule } from './student-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
  ],
  declarations: [
    StudentPage,
    LogoutbuttonComponent,
    SidebarComponent,
    PendingTicketComponent,
    ModalTicketClosedComponent,
    LateWarningComponent,
  ],
})
export class StudentPageModule {}
