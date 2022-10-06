/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesListComponent } from 'src/app/components/coursesPage/courses-list/courses-list.component';
import { CoursesUndefinedComponent } from 'src/app/components/coursesPage/courses-undefined/courses-undefined.component';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { CourseDetailsComponent } from 'src/app/components/selectCoursePage/select-details-course/course-details/course-details.component';
import { SelectDetailsCourseComponent } from 'src/app/components/selectCoursePage/select-details-course/select-details-course.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { SelectCoursePage } from './select-course.page';
import { SelectCoursePageRoutingModule } from './select-course-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCoursePageRoutingModule,
  ],
  declarations: [
    SelectCoursePage,
    LogoutbuttonComponent,
    SidebarComponent,
    CourseDetailsComponent,
    CoursesListComponent,
    CoursesUndefinedComponent,
    SelectDetailsCourseComponent,
  ],
})
export class SelectCoursePageModule {}
