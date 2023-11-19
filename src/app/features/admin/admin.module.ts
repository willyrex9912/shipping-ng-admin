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


@NgModule({
  declarations: [
    CreateOrganizationComponent,
    OrganizationListComponent,
    RolesListComponent,
    CreateRolesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TranslocoModule,
    FormsModule,
    AppCommonsModule
  ]
})
export class AdminModule {
}
