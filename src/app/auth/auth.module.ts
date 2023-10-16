import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {LoginComponent} from "./pages/login/login.component";
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
    exports: [ LoginComponent ]
})
export class AuthModule { }
