import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./pages/supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'select-course',
    loadChildren: () => import('./pages/select-course/select-course.module').then( m => m.SelectCoursePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'select-ticket-type',
    loadChildren: () => import('./pages/select-ticket-type/select-ticket-type.module').then( m => m.SelectTicketTypePageModule)
  },
  {
    path: 'inicio-de-estagio',
    loadChildren: () => import('./pages/inicio-de-estagio/inicio-de-estagio.module').then( m => m.InicioDeEstagioPageModule)
  },
  {
    path: 'modal-card-open',
    loadChildren: () => import('./pages/modal-card-open/modal-card-open.module').then( m => m.ModalCardOpenPageModule)
  },
  {
    path: 'model-card-closed',
    loadChildren: () => import('./pages/model-card-closed/model-card-closed.module').then( m => m.ModelCardClosedPageModule)
  },
  {
    path: 'acompanhamento',
    loadChildren: () => import('./pages/acompanhamento/acompanhamento.module').then( m => m.AcompanhamentoPageModule)
  },
  {
    path: 'fim-de-estagio',
    loadChildren: () => import('./pages/fim-de-estagio/fim-de-estagio.module').then( m => m.FimDeEstagioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
