import {Component, inject} from '@angular/core';
import {SessionService} from "../../app-commons/services/session.service";
import {UserInfo} from "../../auth/models/user-info";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-user-nav-bar',
  templateUrl: './user-nav-bar.component.html',
  styleUrls: ['./user-nav-bar.component.scss']
})
export class UserNavBarComponent {

  private session: SessionService = inject(SessionService);
  private router: Router = inject(Router);

  authService: AuthService = inject(AuthService);
  userInfo: UserInfo | undefined;
  paths = {
    roles: { name: "/administration/roles", show: true },
    organizations: { name: "/administration/organizations", show: true },
    users: { name: "/administration/users", show: true },
    vehicles: { name: "/administration/vehicles", show: true },
    parameters: { name: "/administration/parameters", show: true },
  };

  constructor() {}

  logout(){
    localStorage.removeItem('token');
    this.session.userInfoSignal.set(undefined);
    this.router.navigate(['/']);
  }
}
