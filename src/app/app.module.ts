/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './provider/interceptor.service';
import { FormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgxExtendedPdfViewerModule,
    IonicModule],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
