import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmRole } from 'src/app/data/models/admin';
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

  save(role: AdmRole) {
    if (role.roleId) {
      return this.http.put(`${baseURL}/${role.roleId}`, role);
    }
    return this.http.post(baseURL, role);
  }
}
