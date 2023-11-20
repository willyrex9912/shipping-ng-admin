import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "./models/credentials";
import {Token} from "./models/token";
import {JwtService} from "../app-commons/services/jwt-service";
import {UserInfo} from "./models/user-info";
import {AdmRoleService} from "../services/adm/adm-role.service";
import {AdmRoleRouteDto, RequestRoleRoutesDto} from "../data/models/admin";
import {catchError, map, Observable, of} from "rxjs";
import {SessionService} from "../app-commons/services/session.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURl = environment.baseUrl;

  private http: HttpClient = inject(HttpClient);
  private jwtService: JwtService = inject(JwtService);
  private rolService: AdmRoleService = inject(AdmRoleService);
  private router: Router = inject(Router);

  constructor() {
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  }

  login(credentials: Credentials) {
    return this.http.post<Token>(`${this.baseURl}/auth`, credentials);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    return token && !this.jwtService.isTokenExpired(token);
  }

  hasPermission(permission: string): Observable<boolean> {
    let requestBody = new RequestRoleRoutesDto();
    requestBody.rolIds = this.getUserInfo()!.rolesId;

    return this.rolService.getPermissionsByRol(requestBody).pipe(
      map((routes: AdmRoleRouteDto[]) => routes.some(route => route.routeRef === permission)),
      catchError(() => of(false))
    );
  }

  getUserInfo(): UserInfo | undefined{
    let token = localStorage.getItem('token');
    if (!token) return undefined;
    let decodedToken = this.jwtService.decodeToken(token);
    let userInfo: UserInfo = new UserInfo();
    userInfo.userId = decodedToken['user'];
    userInfo.email = decodedToken['sub'];
    userInfo.orgId = decodedToken['org'];
    userInfo.subOrgId = decodedToken['subOrg'];
    userInfo.rolesId = decodedToken['roles'];
    return userInfo;
  }

  logout(){
    localStorage.clear();
    void this.router.navigate(['/']);
  }

}
