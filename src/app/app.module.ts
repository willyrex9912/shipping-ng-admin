import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import {AppCommonsModule} from "./app-commons/app-commons.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {AuthModule} from "./auth/auth.module";
import {NavBarComponent} from "./views/nav-bar/nav-bar.component";
import {UserNavBarComponent} from "./views/user-nav-bar/user-nav-bar.component";
import {UserHomepageComponent} from "./views/user-homepage/user-homepage.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    UserNavBarComponent,
    UserHomepageComponent
  ],
  imports: [
    AppCommonsModule,
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
