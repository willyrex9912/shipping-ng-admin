import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../base-service";
import {AdmVehicle} from "../../data/models/admin";
import {environment} from "../../../environments/environment";

const baseURL = `${environment.baseUrl}/vehicles`

@Injectable({
  providedIn: 'root'
})
export class AdmVehicleService extends BaseService{

  private http: HttpClient = inject(HttpClient);

  constructor() {
    super();
  }

  findAll(queryParams: Map<string, string> = new Map()) {
    const params = this.getParams(queryParams);
    return this.http.get<AdmVehicle[]>(`${baseURL}`, { observe: 'response', params: params });
  }

  findById(vehicleId: number) {
    return this.http.get<AdmVehicle>(`${baseURL}/${vehicleId}`);
  }

  save(vehicle: AdmVehicle) {
    if (vehicle.vehicleId) {
      return this.http.put<AdmVehicle>(`${baseURL}/${vehicle.vehicleId}`, vehicle);
    }
    return this.http.post<AdmVehicle>(baseURL, vehicle);
  }

}
