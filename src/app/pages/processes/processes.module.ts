import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessesPageRoutingModule } from './processes-routing.module';

import { ProcessesPage } from './processes.page';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ProcessesListComponent } from 'src/app/components/processesPage/processes-list/processes-list.component';
import { ProcessEditComponent } from 'src/app/components/processesPage/process-edit/process-edit.component';
import { ProcessUndefinedComponent } from 'src/app/components/process-undefined/process-undefined.component';
import { FaseEditComponent } from 'src/app/components/processesPage/fase-edit/fase-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessesPageRoutingModule,
  ],
  declarations: [
    ProcessesPage, 
    LogoutbuttonComponent, 
    SidebarComponent, 
    ProcessesListComponent, 
    ProcessEditComponent, 
    ProcessUndefinedComponent,
    FaseEditComponent
  ]
})
export class ProcessesPageModule { }
