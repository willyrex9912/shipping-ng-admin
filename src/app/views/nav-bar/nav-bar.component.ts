import {Component, effect, inject} from '@angular/core';
import {SessionService} from "../../app-commons/services/session.service";
import {UserInfo} from "../../auth/models/user-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  private router: Router = inject(Router);

  constructor() {}
  showLogin() {
    this.router.navigate(['/login']);
  }

}
