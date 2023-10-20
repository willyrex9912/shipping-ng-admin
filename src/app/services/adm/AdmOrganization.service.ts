import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AdmOrganization} from "../../data/models/admin";
import {Observable} from "rxjs";
import {environment} from "../../../environments/envoronment";

const baseUrl = environment.baseUrl + '/organizations'

@Injectable({
  providedIn: 'root'
})
export class AdmOrganizationService {

  constructor(
    private http:HttpClient
  ) {
  }

  save(entity:AdmOrganization):Observable<any>{
    if(entity.organizationId){
      // TODO: Implement update organization function
    }
    return this.http.post<any>(`${baseUrl}`, entity);
  }

  findAll():Observable<AdmOrganization[]>{
    return this.http.get<AdmOrganization[]>(`${baseUrl}`);
  }

}
