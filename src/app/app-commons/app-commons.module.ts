import {NgModule} from "@angular/core";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {TranslocoModule} from "@ngneat/transloco";
import {NoWitheSpaceDirective} from "./directives/no-withe-space.directive";
import {ToasterComponent} from "./components/toaster/toaster.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    NotFoundComponent,
    NoWitheSpaceDirective,
    ToasterComponent
  ],
  imports: [
    TranslocoModule,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  exports: [
    NotFoundComponent,
    NoWitheSpaceDirective,
    ToasterComponent
  ]
})
export class AppCommonsModule {

}
