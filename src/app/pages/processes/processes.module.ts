import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessesPageRoutingModule } from './processes-routing.module';

import { ProcessesPage } from './processes.page';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ProcessesListComponent } from 'src/app/components/processes-list/processes-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessesPageRoutingModule
  ],
  declarations: [ProcessesPage, LogoutbuttonComponent, SidebarComponent, ProcessesListComponent]
})
export class ProcessesPageModule {}
