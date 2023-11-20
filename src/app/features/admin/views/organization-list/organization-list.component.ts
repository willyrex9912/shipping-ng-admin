import {Component, OnInit} from "@angular/core";
import {AdmOrganization} from "../../../../data/models/admin";
import {AdmOrganizationService} from "../../../../services/adm/adm-organization.service";
import {ToasterService} from "../../../../services/oth/toaster.service";
import {ToasterEnum} from "../../../../global/toaster-enum";
import {Permission} from "../../../../global/permission";

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  organizations:AdmOrganization[] = [];
  permission = Permission;

  constructor(
    private organizationService:AdmOrganizationService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit() {
    this.organizationService.findAll().subscribe({
      next: (organizations:AdmOrganization[]) => {
        this.organizations = organizations;
      }, error: _ => {
        this.showErrorMessage('txt_server_error')
      }
    });
  }

  private showErrorMessage(message:string){
    this.toasterService.show({
      type:ToasterEnum.ERROR,
      message: message,
      header:'txt_error',
    });
  }

}
