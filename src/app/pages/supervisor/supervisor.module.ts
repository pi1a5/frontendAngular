/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { TicketsWithoutSupervisorComponent } from 'src/app/components/tickets-without-supervisor/tickets-without-supervisor.component';
import { TicketsWithSupervisorComponent } from 'src/app/components/tickets-with-supervisor/tickets-with-supervisor.component';
import { ModalTicketOpenComponent } from 'src/app/components/modal-ticket-open/modal-ticket-open.component';
import { SupervisorPageRoutingModule } from './supervisor-routing.module';

import { SupervisorPage } from './supervisor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupervisorPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    SupervisorPage,
    LogoutbuttonComponent,
    SidebarComponent,
    TicketsWithoutSupervisorComponent,
    TicketsWithSupervisorComponent,
    ModalTicketOpenComponent,
  ],

})
export class SupervisorPageModule {}
