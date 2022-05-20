import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { ApiStudentService } from 'src/app/services/api-student.service';
import { ApiService } from 'src/app/services/api.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage implements OnInit {

  public sidebarItems = [
    { title: 'Novo Ticket', url: 'newTicket', icon: 'create' },
    { title: 'Perfil', url: 'profile', icon: 'person' },
  ]
  private user: any = {
    foto: 'https://ionicframework.com/docs/demos/api/avatar/avatar.svg',
    nome: '',
    email: ''
  };
  private tipoEstagio: string = 'Início Estágio';
  private ticketsE: [any];
  private ticketP: any;

  constructor(private ggAuth: GoogleAuthService, private api: ApiService, private router: Router, private apiStudent: ApiStudentService) { }

  async ngOnInit() {
    this.apiStudent.getTicketsUser().subscribe(tickets => {
      console.log(tickets);
      this.defineTickets(tickets);
    }, error => {
      console.log(error);
    })

    this.api.getUser().subscribe(user => {
      this.user = user;
    }, error => {
      console.log(error);
    })
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
      if (!tickets[index].feedback) {
        this.ticketP = tickets[index];
        this.formatDate(tickets[index].data_criado, tickets[index].data_limite);
      } else {
        this.ticketsE.push(tickets[index]);
      }
    }
  }

  formatDate(date: string, date2: string) {
    this.ticketP.data_criado = format(new Date(date), 'dd/MM/yyyy');
    this.ticketP.data_limite = format(new Date(date2), 'dd/MM/yyyy');
  }
}
