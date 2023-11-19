import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateOrganizationComponent } from './views/create-organization/create-organization.component';
import { OrganizationListComponent } from './views/organization-list/organization-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { AppCommonsModule } from '../app-commons/app-commons.module';
import { FormsModule } from '@angular/forms';
import { RolesListComponent } from './views/roles/roles-list/roles-list.component';
import { CreateRolesComponent } from './views/roles/create-roles/create-roles.component';
import { CreateUserComponent } from './views/users/create-user/create-user.component';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import { VehiclesListComponent } from './views/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesCreateComponent } from './views/vehicles/vehicles-create/vehicles-create.component';
import { ParametersListComponent } from './views/parameter/parameters-list/parameters-list.component';
import { ParametersCreateComponent } from './views/parameter/parameters-create/parameters-create.component';


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    OrganizationListComponent,
    RolesListComponent,
    CreateRolesComponent,
    CreateUserComponent,
    VehiclesListComponent,
    VehiclesCreateComponent,
    ParametersListComponent,
    ParametersCreateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslocoModule,
    FormsModule,
    AppCommonsModule,
    NgbDropdown,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbDropdownToggle
  ]
})
export class AdminModule {
}
