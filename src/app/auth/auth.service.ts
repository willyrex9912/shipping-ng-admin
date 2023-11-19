import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/envoronment";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "./models/credentials";
import {Token} from "./models/token";
import {JwtService} from "../app-commons/services/jwt-service";
import {UserInfo} from "./models/user-info";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURl = environment.baseUrl;

  private http: HttpClient = inject(HttpClient);
  private jwtService: JwtService = inject(JwtService);

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

  getuserInfo(): UserInfo | undefined{
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
}
