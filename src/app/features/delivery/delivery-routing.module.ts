import {RouterModule, Routes} from "@angular/router";
import {PackageListComponent} from "./package-list/package-list.component";
import {PackageCrudComponent} from "./package-crud/package-crud.component";
import {NgModule} from "@angular/core";

const routes:Routes = [
  {
    path: 'packages',
    children: [
      { path: '', component: PackageListComponent},
      { path: 'create', component: PackageCrudComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule {
}
