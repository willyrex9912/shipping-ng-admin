import {NgModule} from "@angular/core";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    TranslocoModule
  ],
  exports: [
    NotFoundComponent
  ]
})
export class AppCommonsModule {

}
