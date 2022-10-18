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
import { ProcessEditComponent } from 'src/app/components/processesPage/process-edit/process-edit.component';
import { ProcessUndefinedComponent } from 'src/app/components/process-undefined/process-undefined.component';
import { FaseEditComponent } from 'src/app/components/processesPage/fase-edit/fase-edit.component';
import { SearchableSelectComponent } from 'src/app/components/searchable-select/searchable-select.component';
import { ProcessesPage } from './processes.page';
import { ProcessesPageRoutingModule } from './processes-routing.module';

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
    FaseEditComponent,
    SearchableSelectComponent,
  ],
})
export class ProcessesPageModule { }
