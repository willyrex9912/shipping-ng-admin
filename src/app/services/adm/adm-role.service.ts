import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmRole, AdmRoleDto } from 'src/app/data/models/admin';
import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/envoronment';

const baseURL = `${environment.baseUrl}/roles`

@Injectable({
  providedIn: 'root'
})
export class AdmRoleService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findById(roleId: number) {
    return this.http.get<AdmRole>(`${baseURL}/${roleId}`);
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmRoleDto[]>(baseURL, { observe: 'response', params: params });
  }

  save(role: AdmRole) {
    if (role.roleId) {
      return this.http.put(`${baseURL}/${role.roleId}`, role);
    }
    return this.http.post(baseURL, role);
  }
}
