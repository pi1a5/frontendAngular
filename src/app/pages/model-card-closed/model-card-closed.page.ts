import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-model-card-closed',
  templateUrl: './model-card-closed.page.html',
  styleUrls: ['./model-card-closed.page.scss'],
})
export class ModelCardClosedPage implements OnInit {

  private ticket: any = null;

  constructor(
    private navParams: NavParams,
    public modalController: ModalController,
    public toastController: ToastController,
    private api: ApiService,
    private router : Router
  ) { }

  ngOnInit() {
    this.ticket = this.navParams.get('ticket');
  }

  async presentToast(msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      icon: icon,
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  showPdf(id: number) {
    this.api.getPdfUrl(id).subscribe(data => {
      
      for (let index = 0; index < data.length; index++) {

        let navigationExtras: NavigationExtras = {
          queryParams: { url: data[index].arquivo }
        };

        const url = this.router.serializeUrl(
          this.router.createUrlTree(['/pdf'], navigationExtras)
        );

        window.open(url, '_blank');
      }
    })
  }

}
