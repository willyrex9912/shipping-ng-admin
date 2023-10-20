import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OrganizationListComponent} from "./views/organization-list/organization-list.component";
import {CreateOrganizationComponent} from "./views/create-organization/create-organization.component";

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
