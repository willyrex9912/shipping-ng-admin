import {mapToCanActivate, RouterModule, Routes} from "@angular/router";
import {PackageListComponent} from "./views/package/package-list/package-list.component";
import {PackageCrudComponent} from "./views/package/package-crud/package-crud.component";
import {NgModule} from "@angular/core";
import {AllowNavigationGuard} from "../../auth/allow-navigation.guard";
import {PermissionType} from "../../global/permission-type";
import {Permission} from "../../global/permission";

const routes:Routes = [
  {
    path: 'packages',
    children: [
      { path: '', component: PackageListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.PACKAGES }}
      },
      { path: 'create', component: PackageCrudComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.PACKAGES }}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryRoutingModule {
}
