import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolesComponent } from 'src/app/features/admin/views/roles/create-roles/create-roles.component';
import { RolesListComponent } from 'src/app/features/admin/views/roles/roles-list/roles-list.component';
import { OrganizationListComponent } from './views/organization/organization-list/organization-list.component';
import { CreateOrganizationComponent } from './views/organization/create-organization/create-organization.component';
import {OperationCostListComponent} from "./views/operation-cost/operation-cost-list/operation-cost-list.component";
import {OperationCostCrudComponent} from "./views/operation-cost/operation-cost-crud/operation-cost-crud.component";

const routes: Routes = [
  {
    path: 'organizations',
    children: [
      { path: '', component: OrganizationListComponent },
      { path: 'create', component: CreateOrganizationComponent }
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
    path: 'operation-costs',
    children: [
      { path: '', component: OperationCostListComponent },
      { path: 'create', component: OperationCostCrudComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
