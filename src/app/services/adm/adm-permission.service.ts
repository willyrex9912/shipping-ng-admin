import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmPermissionDto, AdmRole } from 'src/app/data/models/admin';
import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/envoronment';

const baseURL = `${environment.baseUrl}/permissions`

@Injectable({
  providedIn: 'root'
})
export class AdmPermissionService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  create(role: AdmRole) {
    return this.http.post(baseURL, role);
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams)
    return this.http.get<AdmPermissionDto[]>(baseURL, { params: params, observe: 'response' });
  }
}
