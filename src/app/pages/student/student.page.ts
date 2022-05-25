import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';
import { S3Service } from 'src/app/services/s3.service';
import { ModelCardClosedPage } from '../model-card-closed/model-card-closed.page';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  private ticketsE: any = [];
  private ticketP: any = null;

  constructor(
    private ggAuth: GoogleAuthService,
    private router: Router,
    private apiStudent: ApiStudentService,
    private s3: S3Service,
    public modalController: ModalController
  ) { }

  async ngOnInit() {
    this.apiStudent.checkIfFinalizou().subscribe(data => {
      console.log('data:', data);

    }, error => {
      console.log('errr:', error);

    });

    this.apiStudent.getTicketsUser().subscribe(tickets => {
      console.log(tickets);
      this.defineTickets(tickets)

    }, error => {
      console.log(error);
    });
  }

  async presentModal(ticket: any) {
    var modal = await this.modalController.create({
      component: ModelCardClosedPage,
      componentProps: { ticket }
    });
    return modal.present();
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

  defineTickets(tickets: any) {

    for (let index = 0; index < tickets.length; index++) {
      if (tickets[index].feedback) {
        this.ticketsE.push(tickets[index]);
    
        var index_novo = this.ticketsE.length;
    
        if (tickets[index].data_criado) {
          this.ticketsE[index_novo - 1].data_criado = this.formatDate(tickets[index].data_criado)
        }
        if (tickets[index].data_limite) {
          this.ticketsE[index_novo - 1].data_limite = this.formatDate(tickets[index].data_limite);
        }
        if (tickets[index].data_fechado) {
          this.ticketsE[index_novo - 1].data_fechado = this.formatDate(tickets[index].data_fechado);
        }
      } else {
        this.ticketP = tickets[index];
        
        if (tickets[index].data_criado) {
          this.ticketP.data_criado = this.formatDate(tickets[index].data_criado);
        }
        if (tickets[index].data_limite) {
          this.ticketP.data_limite = this.formatDate(tickets[index].data_limite);
        }
      }
    }
  }

  formatDate(date: string) {
    return format(new Date(date.replace(/-/g, '\/').replace(/T.+/, '')), 'dd/MM/yyyy');
  }

  showPdf(id: number) {
    let navigationExtras: NavigationExtras = {
      queryParams: { id }
    };

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/pdf'], navigationExtras)
    );
  
    window.open(url, '_blank');
  }
}
