import {Component, effect, inject} from '@angular/core';
import {SessionService} from "../../app-commons/services/session.service";
import {UserInfo} from "../../auth/models/user-info";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {Permission} from "../../global/permission";
import {AdmPermissionService} from "../../services/adm/adm-permission.service";
import {PermissionType} from "../../global/permission-type";

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.scss']
})
export class UserNavBarComponent {

  private session: SessionService = inject(SessionService);
  private router: Router = inject(Router);
  permission = Permission;

  authService: AuthService = inject(AuthService);
  userInfo: UserInfo | undefined;
  paths = {
    roles: { name: "/administration/roles", show: true },
    organizations: { name: "/administration/organizations", show: true },
    users: { name: "/administration/users", show: true },
    vehicles: { name: "/administration/vehicles", show: true },
    parameters: { name: "/administration/parameters", show: true },
    operationCosts: { name: "/administration/operation-costs", show: true },
    packages: { name: "/delivery/packages", show: true },
  };

  constructor(
    private permissionService:AdmPermissionService,
  ) {
    effect(() => {
      this.userInfo = this.session.userInfoSignal();
    });
  }

  logout(){
    localStorage.removeItem('token');
    this.session.userInfoSignal.set(undefined);
    void this.router.navigate(['/']);
  }

  allowModule(permission:Permission){
    return this.permissionService.isNavigationAllowed(permission, PermissionType.READ);
  }
}
