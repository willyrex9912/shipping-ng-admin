import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateOrganizationComponent } from './views/organization/create-organization/create-organization.component';
import { OrganizationListComponent } from './views/organization/organization-list/organization-list.component';
import { TranslocoModule } from '@ngneat/transloco';
import { AppCommonsModule } from '../../app-commons/app-commons.module';
import { FormsModule } from '@angular/forms';
import { RolesListComponent } from './views/roles/roles-list/roles-list.component';
import { CreateRolesComponent } from './views/roles/create-roles/create-roles.component';
import { OperationCostCrudComponent } from './views/operation-cost/operation-cost-crud/operation-cost-crud.component';
import { OperationCostListComponent } from './views/operation-cost/operation-cost-list/operation-cost-list.component';
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    OrganizationListComponent,
    RolesListComponent,
    CreateRolesComponent,
    OperationCostCrudComponent,
    OperationCostListComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        TranslocoModule,
        FormsModule,
        AppCommonsModule,
        NgSelectModule
    ]
})
export class AdminModule {
}
