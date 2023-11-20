import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AdmPermissionDto, AdmRole, AdmRolePermissionDto} from 'src/app/data/models/admin';
import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/environment';
import {PermissionType} from "../../global/permission-type";
import {Observable} from "rxjs";

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

  findMyPermissions():Observable<AdmRolePermissionDto[]>{
    return this.http.get<AdmRolePermissionDto[]>(`${baseURL}/my-permissions`);
  }

  private getMyPermissionsLS():AdmRolePermissionDto[]{
    let data = localStorage.getItem('permix');
    return data ? JSON.parse(data) as AdmRolePermissionDto[] : [];
  }

  isNavigationAllowed(internalId:number, type:PermissionType):boolean{
    const rolePermission = this.getMyPermissionsLS()
      .find(rp => {
        switch (type) {
          case PermissionType.READ:
            return internalId === rp.internalId && rp.readPermission;
          case PermissionType.CREATE:
            return internalId === rp.internalId && rp.createPermission;
          case PermissionType.UPDATE:
            return internalId === rp.internalId && rp.updatePermission;
          default:
            return undefined;
        }
      })
    ;
    return rolePermission != undefined;
  }

}
