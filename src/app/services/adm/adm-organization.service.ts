import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AdmOrganization} from "../../data/models/admin";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {BaseService} from "../base-service";

const baseUrl = environment.baseUrl + '/organizations'

@Injectable({
  providedIn: 'root'
})
export class AdmOrganizationService extends BaseService {

  constructor(
    private http:HttpClient
  ) {
    super();
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

  findOrganizationsByParentId(organizationId:number, queryParams: Map<string, string> = new Map()):Observable<AdmOrganization[]>{
    const params = this.getParams(queryParams);
    return this.http.get<AdmOrganization[]>(`${baseUrl}/organizationsByParent/${organizationId}`);
  }

}
