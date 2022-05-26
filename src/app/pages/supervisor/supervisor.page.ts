import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiSupervisorService } from 'src/app/services/api-supervisor.service';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { ModalCardOpenPage } from '../modal-card-open/modal-card-open.page';
import { ModelCardClosedPage } from '../model-card-closed/model-card-closed.page';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {

  private ticketsWithoutSupervisor: any = [];
  private ticketsWithSupervisor: any = [];
  private closedTicketsWithSupervisor: any = [];

  constructor(
    private ggAuth: GoogleAuthService, 
    private router: Router, 
    private apiSupervisor: ApiSupervisorService, 
    private api: ApiService,
    public modalController: ModalController) { }

  async ngOnInit() {
    this.apiSupervisor.getTicketsWithoutSupervisor().subscribe(data => {
      console.log("Alunos sem orientador: ",data);
      this.ticketsWithoutSupervisor = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].data_criado) {
          this.ticketsWithoutSupervisor[index].data_criado = this.formatDate(data[index].data_criado);
        }
        if (data[index].data_limite) {
          this.ticketsWithoutSupervisor[index].data_limite = this.formatDate(data[index].data_limite);
        }
      }
    }, error => {
      console.log("Alunos sem orientador: ",error);
    });

    this.apiSupervisor.getTicketsWithSupervisor().subscribe(data => {
      console.log("Alunos sob sua orientação: ",data);
      this.ticketsWithSupervisor = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].data_criado) {
          this.ticketsWithSupervisor[index].data_criado = this.formatDate(data[index].data_criado);
        }
        if (data[index].data_limite) {
          this.ticketsWithSupervisor[index].data_limite = this.formatDate(data[index].data_limite);
        }
      }
    }, error => {
      console.log("Alunos sob sua orientação: ",error);
    });

    this.apiSupervisor.getClosedTicketsWithSupervisor().subscribe(data => {
      console.log("Tickets respondidos: ",data);
      this.closedTicketsWithSupervisor = data;
      for (let index = 0; index < data.length; index++) {
        if (data[index].data_criado) {
          this.closedTicketsWithSupervisor[index].data_criado = this.formatDate(data[index].data_criado);
        }
        if (data[index].data_limite) {
          this.closedTicketsWithSupervisor[index].data_limite = this.formatDate(data[index].data_limite);
        }
        if (data[index].data_fechado) {
          this.closedTicketsWithSupervisor[index].data_fechado = this.formatDate(data[index].data_fechado);
        }
      }
    }, error => {
      console.log("Tickets respondidos: ",error);
    });
    
  }

  async presentModal(ticket: any) {
    if (ticket.feedback) {
      var modal = await this.modalController.create({
        component: ModelCardClosedPage,
        componentProps: { ticket }
      });
      return modal.present();
    } else {
      var modal = await this.modalController.create({
        component: ModalCardOpenPage,
        componentProps: { ticket }
      });
      await modal.present();
      var {data} = await modal.onDidDismiss();   
      if (data) {
        await this.ngOnInit();
      }
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

  goToNewTicket() {
    this.router.navigate(['select-ticket-type'], { replaceUrl: true });
  }

  goToProfile() {
    this.router.navigate(['profile'], { replaceUrl: true });
  }

  formatDate(date: string) {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }
}
