/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { ModalCardOpenPage } from '../modal-card-open/modal-card-open.page';
import { ModelCardClosedPage } from '../model-card-closed/model-card-closed.page';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {
  public searchTerm: string;

  public ticketsWithoutSupervisor: any = [];

  public ticketsWithSupervisor: any = [];

  public closedTicketsWithSupervisor: any = [];

  constructor(
    public ggAuth: GoogleAuthService,
    public router: Router,
    public apiSupervisor: ApiSupervisorService,
    public modalController: ModalController,
  ) { }

  async ngOnInit() {
    this.apiSupervisor.getTicketsWithoutSupervisor().subscribe((data) => {
      console.log('Alunos sem orientador: ', data);
      this.ticketsWithoutSupervisor = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].data_criado) {
          this.ticketsWithoutSupervisor[index].data_criado = this.formatDate({ date: data[index].data_criado });
        }
        if (data[index].data_limite) {
          this.ticketsWithoutSupervisor[index].data_limite = this.formatDate({ date: data[index].data_limite });
        }
      }
    }, (error) => {
      console.log('Alunos sem orientador: ', error);
    });

    this.apiSupervisor.getTicketsWithSupervisor().subscribe((data) => {
      console.log('Alunos sob sua orientação: ', data);
      this.ticketsWithSupervisor = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].data_criado) {
          this.ticketsWithSupervisor[index].data_criado = this.formatDate({ date: data[index].data_criado });
        }
        if (data[index].data_limite) {
          this.ticketsWithSupervisor[index].data_limite = this.formatDate({ date: data[index].data_limite });
        }
      }
    }, (error) => {
      console.log('Alunos sob sua orientação: ', error);
    });

    this.apiSupervisor.getClosedTicketsWithSupervisor().subscribe((data) => {
      console.log('Tickets respondidos: ', data);
      this.closedTicketsWithSupervisor = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].data_criado) {
          this.closedTicketsWithSupervisor[index].data_criado = this.formatDate({ date: data[index].data_criado });
        }
        if (data[index].data_limite) {
          this.closedTicketsWithSupervisor[index].data_limite = this.formatDate({ date: data[index].data_limite });
        }
        if (data[index].data_fechado) {
          this.closedTicketsWithSupervisor[index].data_fechado = this.formatDate({ date: data[index].data_fechado });
        }
      }
    }, (error) => {
      console.log('Tickets respondidos: ', error);
    });
  }

  async presentModal(ticket: any): Promise<void> {
    if (ticket.feedback) {
      const modal = await this.modalController.create({
        component: ModelCardClosedPage,
        componentProps: { ticket },
      });
      return modal.present();
    }
    var modal = await this.modalController.create({
      component: ModalCardOpenPage,
      componentProps: { ticket },
    });
    await modal.present();
    var { data } = await modal.onDidDismiss();
    if (data) {
      await this.ngOnInit();
    }
  }

  async signOut() {
    try {
      await this.ggAuth.signOut();
      this.router.navigate(['home'], { replaceUrl: true });
    } catch (error) {
      console.log(error);
    }
  }

  goToProfile() {
    this.router.navigate(['profile'], { replaceUrl: true });
  }

  goToChartSupervisors() {
    this.router.navigate(['chart-supervisors'], { replaceUrl: true });
  }

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }
}
