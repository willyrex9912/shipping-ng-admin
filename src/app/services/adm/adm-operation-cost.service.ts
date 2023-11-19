import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AdmOperationCost, AdmOperationCostDto} from 'src/app/data/models/admin';
import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/envoronment';

const baseURL = `${environment.baseUrl}/operation-costs`

@Injectable({
  providedIn: 'root'
})
export class AdmOperationCostService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findById(entityId: number) {
    return this.http.get<AdmOperationCost>(`${baseURL}/${entityId}`);
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmOperationCostDto[]>(baseURL, { observe: 'response', params: params });
  }

  save(entity: AdmOperationCost) {
    if (entity.operationCostId) {
      return this.http.put(`${baseURL}/${entity.operationCostId}`, entity);
    }
    return this.http.post(baseURL, entity);
  }
}
