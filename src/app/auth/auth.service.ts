import {inject, Injectable} from '@angular/core';
import {environment} from "../../environments/envoronment";
import {HttpClient} from "@angular/common/http";
import {Credentials} from "./models/credentials";
import {map} from "rxjs";
import {Token} from "./models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURl = environment.baseUrl;

  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  getToken() {
    let token = localStorage.getItem('token');
    return token ? `Bearer ${token}` : null;
  }

  login(credentials: Credentials) {
    return this.http.post<Token>(`${this.baseURl}/auth`, credentials);
  }
}
