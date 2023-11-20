import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import {BaseService} from "../base-service";
import {AdmParameter} from "../../data/models/admin";

const baseURL = `${environment.baseUrl}/parameters`

@Injectable({
  providedIn: 'root'
})
export class AdmParameterService extends BaseService {

  private http: HttpClient = inject(HttpClient);

  constructor() {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmParameter[]>(`${baseURL}`, { observe: 'response', params: params });
  }

  findById(parameterId: number) {
    return this.http.get<AdmParameter>(`${baseURL}/${parameterId}`);
  }

  save(parameter: AdmParameter) {
    if (parameter.parameterId) {
      return this.http.put<AdmParameter>(`${baseURL}/${parameter.parameterId}`, parameter);
    }
    return this.http.post<AdmParameter>(baseURL, parameter);
  }
}
