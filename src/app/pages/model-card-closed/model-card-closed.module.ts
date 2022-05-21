import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModelCardClosedPageRoutingModule } from './model-card-closed-routing.module';

import { ModelCardClosedPage } from './model-card-closed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelCardClosedPageRoutingModule
  ],
  declarations: [ModelCardClosedPage]
})
export class ModelCardClosedPageModule {}
