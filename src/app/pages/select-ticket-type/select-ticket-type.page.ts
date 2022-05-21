import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-select-ticket-type',
  templateUrl: './select-ticket-type.page.html',
  styleUrls: ['./select-ticket-type.page.scss'],
})
export class SelectTicketTypePage implements OnInit {

  private list = [
    { id: 0, icon: 'document', name: 'Início de Estágio' },
    { id: 1, icon: 'documents', name: 'Acompanhamento' },
    { id: 2, icon: 'document-text', name: 'Finalização de Estágio' },
    { id: 3, icon: 'document-lock', name: 'Dispensa de Estágio' },
    { id: 4, icon: 'document-attach', name: 'Equiparação' },
    { id: 5, icon: 'globe', name: 'Estágio no Exterior' },
  ]

  constructor(public toastController: ToastController, private router: Router) { }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Indisponível',
      icon: 'warning',
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

  goToForm(id: number) {
    switch (id) {
      case 0:
        this.router.navigate(['inicio-de-estagio'], { replaceUrl: true });
        break;
      case 1:
        this.presentToast();
        break;
      case 2:
        this.presentToast();
        break;
      case 3:
        this.presentToast();
        break;
      case 4:
        this.presentToast();
        break;
      case 5:
        this.presentToast();
        break;

      default:
        console.log('default');
        break;
    }
  }

}
