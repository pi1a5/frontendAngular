/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './guard/session.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'student',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/student/student.module').then((m) => m.StudentPageModule),
  },
  {
    path: 'supervisor',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/supervisor/supervisor.module').then((m) => m.SupervisorPageModule),
  },
  {
    path: 'select-course',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/select-course/select-course.module').then((m) => m.SelectCoursePageModule),
  },
  {
    path: 'profile',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'select-ticket-type',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/select-ticket-type/select-ticket-type.module').then((m) => m.SelectTicketTypePageModule),
  },
  {
    path: 'inicio-de-estagio',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/inicio-de-estagio/inicio-de-estagio.module').then((m) => m.InicioDeEstagioPageModule),
  },
  {
    path: 'modal-card-open',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/modal-card-open/modal-card-open.module').then((m) => m.ModalCardOpenPageModule),
  },
  {
    path: 'model-card-closed',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/model-card-closed/model-card-closed.module').then((m) => m.ModelCardClosedPageModule),
  },
  {
    path: 'acompanhamento',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/acompanhamento/acompanhamento.module').then((m) => m.AcompanhamentoPageModule),
  },
  {
    path: 'fim-de-estagio',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/fim-de-estagio/fim-de-estagio.module').then((m) => m.FimDeEstagioPageModule),
  },
  {
    path: 'pdf',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/pdf/pdf.module').then((m) => m.PdfPageModule),
  },
  {
    path: 'chart-supervisors',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/chart-supervisors/chart-supervisors.module').then((m) => m.ChartSupervisorsPageModule),
  },
  {
    path: 'processes',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/processes/processes.module').then((m) => m.ProcessesPageModule),
  },
  {
    path: 'internships',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/internships/internships.module').then((m) => m.InternshipsPageModule),
  },
  {
    path: 'select-process',
    canActivate: [SessionGuard],
    loadChildren: () => import('./pages/select-process/select-process.module').then((m) => m.SelectProcessPageModule),
  },  {
    path: 'courses',
    loadChildren: () => import('./pages/courses/courses.module').then( m => m.CoursesPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
