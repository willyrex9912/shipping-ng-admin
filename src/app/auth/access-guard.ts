import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AuthService} from "./auth.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AccessGuard {
  private router: Router = inject(Router);
  private authService: AuthService = inject(AuthService);
  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | UrlTree {

    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login']);
    }

    const currentRoute = state.url;
    console.log('Pass into canActivate: ' + currentRoute);
    return this.authService.hasPermission(currentRoute).pipe(
      map(hasPermission => hasPermission || this.router.createUrlTree(['/homepage']))
    );
  }
}
