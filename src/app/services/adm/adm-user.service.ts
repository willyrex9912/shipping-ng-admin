import {inject, Injectable} from '@angular/core';
import {BaseService} from "../base-service";
import { HttpClient } from '@angular/common/http';
import {AdmUser} from "../../data/models/admin";
import {environment} from "../../../environments/environment";

const baseURL = `${environment.baseUrl}/users`

@Injectable({
  providedIn: 'root'
})
export class AdmUserService extends BaseService{

  private http: HttpClient = inject(HttpClient);

  constructor() {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmUser[]>(`${baseURL}`, { observe: 'response', params: params });
  }

  findById(userId: number) {
    return this.http.get<AdmUser>(`${baseURL}/${userId}`);
  }

  save(user: AdmUser) {
    if (user.userId) {
      return this.http.put<AdmUser>(`${baseURL}/${user.userId}`, user);
    }
    return this.http.post<AdmUser>(baseURL, user);
  }
}
