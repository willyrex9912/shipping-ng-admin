import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AdmPackage, AdmPackageDto} from 'src/app/data/models/admin';
import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/environment';

const baseURL = `${environment.baseUrl}/packages`

@Injectable({
  providedIn: 'root'
})
export class AdmPackageService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findById(entityId: number) {
    return this.http.get<AdmPackage>(`${baseURL}/${entityId}`);
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmPackageDto[]>(baseURL, { observe: 'response', params: params });
  }

  save(entity: AdmPackage) {
    if (entity.packageId) {
      return this.http.put(`${baseURL}/${entity.packageId}`, entity);
    }
    return this.http.post(baseURL, entity);
  }
}
