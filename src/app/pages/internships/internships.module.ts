/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { InternshipsManagementComponent } from 'src/app/components/internships-management/internships-management.component';
import { TransferComponent } from 'src/app/components/transfer/transfer.component';
import { InternshipsPage } from './internships.page';
import { InternshipsPageRoutingModule } from './internships-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternshipsPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    InternshipsPage,
    LogoutbuttonComponent,
    SidebarComponent,
    InternshipsManagementComponent,
    TransferComponent,
  ],
})
export class InternshipsPageModule { }
