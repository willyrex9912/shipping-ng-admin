import {Component, effect, inject, OnInit} from '@angular/core';
import {SessionService} from "../../app-commons/services/session.service";
import {UserInfo} from "../../auth/models/user-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-nav-bar',
  templateUrl: './admin-nav-bar.component.html',
  styleUrls: ['./admin-nav-bar.component.scss']
})
export class AdminNavBarComponent {

  private session: SessionService = inject(SessionService);
  private router: Router = inject(Router);
  userInfo: UserInfo | undefined;

  constructor() {
    effect(() => this.userInfo = this.session.userInfoSignal());
  }

  logout(){
    localStorage.removeItem('token');
    this.session.userInfoSignal.set(undefined);
    this.router.navigate(['/']);
  }
}
