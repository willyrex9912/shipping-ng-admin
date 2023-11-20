import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolesComponent } from 'src/app/admin/views/roles/create-roles/create-roles.component';
import { RolesListComponent } from 'src/app/admin/views/roles/roles-list/roles-list.component';
import { OrganizationListComponent } from './views/organization-list/organization-list.component';
import { CreateOrganizationComponent } from './views/create-organization/create-organization.component';
import {VehiclesListComponent} from "./views/vehicles/vehicles-list/vehicles-list.component";
import {VehiclesCreateComponent} from "./views/vehicles/vehicles-create/vehicles-create.component";
import {ParametersListComponent} from "./views/parameter/parameters-list/parameters-list.component";
import {ParametersCreateComponent} from "./views/parameter/parameters-create/parameters-create.component";
import {CreateUserComponent} from "./views/users/create-user/create-user.component";
import {UsersListComponent} from "./views/users/users-list/users-list.component";

const routes: Routes = [
  {
    path: 'organizations',
    children: [
      {
        path: '', component: OrganizationListComponent
      },
      {
        path: 'create', component: CreateOrganizationComponent
      }
    ],
  },
  {
    path: 'roles',
    children: [
      { path: '', component: RolesListComponent },
      { path: 'create', component: CreateRolesComponent },
      { path: 'edit/:roleId', component: CreateRolesComponent }
    ]
  },
  {
    path: 'vehicles',
    children: [
      { path: '', component: VehiclesListComponent },
      { path: 'create', component: VehiclesCreateComponent },
      { path: 'edit/:vehicleId', component: VehiclesCreateComponent }
    ]
  },
  {
    path: 'parameters',
    children: [
      { path: '', component: ParametersListComponent },
      { path: 'create', component: ParametersCreateComponent },
      { path: 'edit/:parameterId', component: ParametersCreateComponent }
    ]
  },
  {
    path: 'users',
    children: [
      { path: '', component: UsersListComponent },
      { path: 'create', component: CreateUserComponent },
      { path: 'edit/:userId', component: CreateUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
