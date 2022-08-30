/* eslint-disable no-useless-escape */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { ModelCardClosedPage } from '../model-card-closed/model-card-closed.page';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {
  public ticketsE: any = [];

  public ticketP: any = null;

  constructor(
    public ggAuth: GoogleAuthService,
    public router: Router,
    public apiStudent: ApiStudentService,
    public api: ApiService,
    public modalController: ModalController,
  ) { }

  async ngOnInit() {
    // this.apiStudent.getTicketsUser().subscribe((tickets) => {
    //   console.log(tickets);
    //   this.defineTickets(tickets);
    // }, (error) => {
    //   if (error.status !== 404) { return console.log(error); }
    // });
  }

  async presentModal(ticket: any) {
    const modal = await this.modalController.create({
      component: ModelCardClosedPage,
      componentProps: { ticket },
    });
    return modal.present();
  }

  defineTickets(tickets: any) {
    for (let index = 0; index < tickets.length; index++) {
      if (tickets[index].feedback) {
        this.ticketsE.push(tickets[index]);

        const indexNovo = this.ticketsE.length;

        if (tickets[index].datacriado) {
          this.ticketsE[indexNovo - 1].datacriado = this.formatDate({ date: tickets[index].datacriado });
        }
        if (tickets[index].datalimite) {
          this.ticketsE[indexNovo - 1].datalimite = this.formatDate({ date: tickets[index].datalimite });
        }
        if (tickets[index].datafechado) {
          this.ticketsE[indexNovo - 1].datafechado = this.formatDate({ date: tickets[index].datafechado });
        }
      } else {
        this.ticketP = tickets[index];
        console.log(this.ticketP);

        if (tickets[index].datacriado) {
          this.ticketP.datacriado = this.formatDate({ date: tickets[index].datacriado });
        }
        if (tickets[index].datalimite) {
          this.ticketP.datalimite = this.formatDate({ date: tickets[index].datalimite });
        }
      }
    }
  }

  formatDate({ date }: { date: string; }): string {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

  showPdf(url: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: { url },
    };

    const urlLoad = this.router.serializeUrl(
      this.router.createUrlTree(['/pdf'], navigationExtras),
    );

    window.open(urlLoad, '_blank');
  }
}
