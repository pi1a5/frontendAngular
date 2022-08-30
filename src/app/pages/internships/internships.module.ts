import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InternshipsPageRoutingModule } from './internships-routing.module';

import { InternshipsPage } from './internships.page';
import { LogoutbuttonComponent } from 'src/app/components/logoutbutton/logoutbutton.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InternshipsPageRoutingModule
  ],
  declarations: [InternshipsPage, LogoutbuttonComponent, SidebarComponent]
})
export class InternshipsPageModule {}
