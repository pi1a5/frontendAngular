/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';

import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { CoursesEditComponent } from 'src/app/components/coursesPage/courses-edit/courses-edit.component';
import { CoursesListComponent } from 'src/app/components/coursesPage/courses-list/courses-list.component';
import { CoursesUndefinedComponent } from 'src/app/components/coursesPage/courses-undefined/courses-undefined.component';
import { SubcourseEditComponent } from 'src/app/components/coursesPage/subcourse-edit/subcourse-edit.component';
import { CoursesPageRoutingModule } from './courses-routing.module';
import { CoursesPage } from './courses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoursesPageRoutingModule,
  ],
  declarations: [
    CoursesPage,
    LogoutbuttonComponent,
    SidebarComponent,
    CoursesListComponent,
    CoursesEditComponent,
    CoursesUndefinedComponent,
    SubcourseEditComponent,
  ],
})
export class CoursesPageModule { }
