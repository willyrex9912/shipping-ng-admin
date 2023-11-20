import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TranslocoModule } from '@ngneat/transloco';
import { AppCommonsModule } from '../../app-commons/app-commons.module';
import { FormsModule } from '@angular/forms';
import { RolesListComponent } from './views/roles/roles-list/roles-list.component';
import { CreateRolesComponent } from './views/roles/create-roles/create-roles.component';
import { CreateUserComponent } from './views/users/create-user/create-user.component';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import { VehiclesListComponent } from './views/vehicles/vehicles-list/vehicles-list.component';
import { VehiclesCreateComponent } from './views/vehicles/vehicles-create/vehicles-create.component';
import { ParametersListComponent } from './views/parameter/parameters-list/parameters-list.component';
import { ParametersCreateComponent } from './views/parameter/parameters-create/parameters-create.component';
import { UsersListComponent } from './views/users/users-list/users-list.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { OperationCostCrudComponent } from './views/operation-cost/operation-cost-crud/operation-cost-crud.component';
import { OperationCostListComponent } from './views/operation-cost/operation-cost-list/operation-cost-list.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {CreateOrganizationComponent} from "./views/create-organization/create-organization.component";
import {OrganizationListComponent} from "./views/organization-list/organization-list.component";

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
    ParametersCreateComponent,
    UsersListComponent,
    OperationCostCrudComponent,
    OperationCostListComponent
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
    NgbDropdownToggle,
    NgMultiSelectDropDownModule,
    NgSelectModule
  ]
})
export class AdminModule {
}
