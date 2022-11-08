/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ProcessesListComponent } from 'src/app/components/processesPage/processes-list/processes-list.component';
import { ProcessUndefinedComponent } from 'src/app/components/process-undefined/process-undefined.component';
import { ProcessDetailsComponent } from 'src/app/components/selectProcessPage/select-details-process/process-details/process-details.component';
import { FormComponent } from 'src/app/components/selectProcessPage/form/form.component';
import { SelectDetailsProcessComponent } from 'src/app/components/selectProcessPage/select-details-process/select-details-process.component';
import { PendingTicketComponent } from 'src/app/components/pending-ticket/pending-ticket.component';
import { PendingTicketWarningComponent } from 'src/app/components/pending-ticket-warning/pending-ticket-warning.component';
import { InternshipCardComponent } from 'src/app/components/profilePage/internship-card/internship-card.component';
import { WaitWarningComponent } from 'src/app/components/selectProcessPage/wait-warning/wait-warning.component';
import { SelectProcessPage } from './select-process.page';
import { SelectProcessPageRoutingModule } from './select-process-routing.module';
import { CircularProgressBarComponent } from 'src/app/components/circular-progress-bar/circular-progress-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectProcessPageRoutingModule,
  ],
  declarations: [
    SelectProcessPage,
    LogoutbuttonComponent,
    SidebarComponent,
    ProcessDetailsComponent,
    ProcessesListComponent,
    ProcessUndefinedComponent,
    FormComponent,
    SelectDetailsProcessComponent,
    PendingTicketComponent,
    PendingTicketWarningComponent,
    CircularProgressBarComponent,
    InternshipCardComponent,
    WaitWarningComponent,
  ],
})
export class SelectProcessPageModule { }
