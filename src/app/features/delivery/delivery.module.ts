import {NgModule} from "@angular/core";
import {PackageCrudComponent} from "./package-crud/package-crud.component";
import {AppCommonsModule} from "../../app-commons/app-commons.module";
import { PackageListComponent } from './package-list/package-list.component';
import {DeliveryRoutingModule} from "./delivery-routing.module";
import {FormsModule} from "@angular/forms";
import {TranslocoDirective} from "@ngneat/transloco";
import {NgSelectModule} from "@ng-select/ng-select";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    PackageCrudComponent,
    PackageListComponent,
  ],
  imports: [
    DeliveryRoutingModule,
    AppCommonsModule,
    FormsModule,
    TranslocoDirective,
    NgSelectModule,
    CommonModule,
  ]
})
export class DeliveryModule {
}
