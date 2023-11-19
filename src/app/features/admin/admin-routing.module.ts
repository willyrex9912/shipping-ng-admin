import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolesComponent } from 'src/app/features/admin/views/roles/create-roles/create-roles.component';
import { RolesListComponent } from 'src/app/features/admin/views/roles/roles-list/roles-list.component';
import { OrganizationListComponent } from './views/organization/organization-list/organization-list.component';
import { CreateOrganizationComponent } from './views/organization/create-organization/create-organization.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
