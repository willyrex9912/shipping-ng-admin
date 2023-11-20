import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AdmCategory, AdmOperationCost, AdmOperationCostDto} from 'src/app/data/models/admin';
import { BaseService } from 'src/app/services/base-service';
import { environment } from 'src/environments/environment';

const baseURL = `${environment.baseUrl}/categories`

@Injectable({
  providedIn: 'root'
})
export class AdmCategoryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  findByInternalId(internalId: number) {
    return this.http.get<AdmCategory>(`${baseURL}/${internalId}`);
  }

  findByParentInternalId(internalId: number) {
    return this.http.get<AdmCategory[]>(`${baseURL}/by-parent/${internalId}`);
  }

}
