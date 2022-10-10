/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupervisorsListComponent } from 'src/app/components/supervisors-list/supervisors-list.component';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AdminSupervisorsPage } from './admin-supervisors.page';
import { AdminSupervisorsPageRoutingModule } from './admin-supervisors-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSupervisorsPageRoutingModule,
    Ng2SearchPipeModule,
  ],
  declarations: [
    AdminSupervisorsPage,
    LogoutbuttonComponent,
    SidebarComponent,
    SupervisorsListComponent,
  ],
})
export class AdminSupervisorsPageModule { }
