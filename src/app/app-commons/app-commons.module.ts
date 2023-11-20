import {NgModule} from "@angular/core";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {TranslocoModule} from "@ngneat/transloco";
import {NoWitheSpaceDirective} from "./directives/no-withe-space.directive";
import {ToasterComponent} from "./components/toaster/toaster.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { RequiredFieldComponent } from './components/required-field/required-field.component';
import {ManagerHomepageComponent} from "./components/manager-homepage.component";
import { HeaderComponent } from './components/header/header.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    NotFoundComponent,
    NoWitheSpaceDirective,
    ToasterComponent,
    RequiredFieldComponent,
    ManagerHomepageComponent,
    HeaderComponent
  ],
  imports: [
    TranslocoModule,
    NgbModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  exports: [
    NotFoundComponent,
    NoWitheSpaceDirective,
    ToasterComponent,
    RequiredFieldComponent,
    HeaderComponent,
  ]
})
export class AppCommonsModule {

}
