import {AuthService} from "./auth.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";

export class AuthCheckGuard {

  constructor(
    private authService:AuthService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean{
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      this.authService.logout();
      return false;
    }
  }

}
