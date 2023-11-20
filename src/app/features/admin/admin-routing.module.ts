import { NgModule } from '@angular/core';
import {mapToCanActivate, RouterModule, Routes} from '@angular/router';
import { CreateRolesComponent } from 'src/app/features/admin/views/roles/create-roles/create-roles.component';
import { RolesListComponent } from 'src/app/features/admin/views/roles/roles-list/roles-list.component';
import { OrganizationListComponent } from './views/organization-list/organization-list.component';
import { CreateOrganizationComponent } from './views/create-organization/create-organization.component';
import {VehiclesListComponent} from "./views/vehicles/vehicles-list/vehicles-list.component";
import {VehiclesCreateComponent} from "./views/vehicles/vehicles-create/vehicles-create.component";
import {ParametersListComponent} from "./views/parameter/parameters-list/parameters-list.component";
import {ParametersCreateComponent} from "./views/parameter/parameters-create/parameters-create.component";
import {CreateUserComponent} from "./views/users/create-user/create-user.component";
import {UsersListComponent} from "./views/users/users-list/users-list.component";
import {OperationCostListComponent} from "./views/operation-cost/operation-cost-list/operation-cost-list.component";
import {OperationCostCrudComponent} from "./views/operation-cost/operation-cost-crud/operation-cost-crud.component";
import {AllowNavigationGuard} from "../../auth/allow-navigation.guard";
import {PermissionType} from "../../global/permission-type";
import {Permission} from "../../global/permission";

const routes: Routes = [
  {
    path: 'organizations',
    children: [
      {
        path: '', component: OrganizationListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.ORGANIZATIONS }}
      },
      {
        path: 'create', component: CreateOrganizationComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.ORGANIZATIONS }}
      }
    ],
  },
  {
    path: 'roles',
    children: [
      { path: '', component: RolesListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.ROLES }}
      },
      { path: 'create', component: CreateRolesComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.ROLES }}
      },
      { path: 'edit/:roleId', component: CreateRolesComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.UPDATE, internalId: Permission.ROLES }}
      }
    ]
  },
  {
    path: 'vehicles',
    children: [
      { path: '', component: VehiclesListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.VEHICLES }}
      },
      { path: 'create', component: VehiclesCreateComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.VEHICLES }}
      },
      { path: 'edit/:vehicleId', component: VehiclesCreateComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.UPDATE, internalId: Permission.VEHICLES }}
      }
    ]
  },
  {
    path: 'parameters',
    children: [
      { path: '', component: ParametersListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.PARAMETERS }}
      },
      { path: 'create', component: ParametersCreateComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.PARAMETERS }}
      },
      { path: 'edit/:parameterId', component: ParametersCreateComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.UPDATE, internalId: Permission.PARAMETERS }}
      }
    ]
  },
  {
    path: 'users',
    children: [
      { path: '', component: UsersListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.USERS }}
      },
      { path: 'create', component: CreateUserComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.USERS }}
      },
      { path: 'edit/:userId', component: CreateUserComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.UPDATE, internalId: Permission.USERS }}
      }
    ]
  },
  {
    path: 'operation-costs',
    children: [
      { path: '', component: OperationCostListComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.READ, internalId: Permission.OPERATION_COSTS }}
      },
      { path: 'create', component: OperationCostCrudComponent, canActivate: mapToCanActivate([AllowNavigationGuard]),
        data: { permission : { type: PermissionType.CREATE, internalId: Permission.OPERATION_COSTS }}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
