import {Injectable} from "@angular/core";
import {AdmPermissionService} from "../services/adm/adm-permission.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {PermissionType} from "../global/permission-type";

@Injectable({
  providedIn: 'root'
})
export class AllowNavigationGuard {

  constructor(
    private permissionService:AdmPermissionService,
    private router:Router,
    private authService:AuthService,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):boolean{
    const type = route.data['permission'].type as PermissionType;
    const internalId = route.data['permission'].internalId as number;
    if(!this.authService.isAuthenticated()){
      this.authService.logout();
      return false;
    }
    let allowed = this.permissionService.isNavigationAllowed(internalId, type);
    if (!allowed) {
      this.router.navigate(['/404']);
      return true;
    }
    return allowed;
  }

}
