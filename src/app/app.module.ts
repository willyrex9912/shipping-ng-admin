import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import {AppCommonsModule} from "./app-commons/app-commons.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from "./views/login/login.component";
import {FormsModule} from "@angular/forms";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {AuthService} from "./services/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    AppCommonsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslocoRootModule,
    NgbModule
  ],
  providers: [
      AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
