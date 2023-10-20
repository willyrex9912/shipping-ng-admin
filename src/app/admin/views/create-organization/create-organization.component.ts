import { Component } from '@angular/core';
import {AdmOrganization} from "../../../data/models/admin";
import {AdmOrganizationService} from "../../../services/adm/AdmOrganization.service";
import {ToasterService} from "../../../services/oth/toaster.service";
import {ToasterEnum} from "../../../global/toaster-enum";

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent {
  organization!:AdmOrganization;

  constructor(
    private organizationService:AdmOrganizationService,
    private toasterService:ToasterService,
  ) {
    this.organization = new AdmOrganization();
  }

  save(){
    this.checkAllIsValid().then(allisValid => {
      if(allisValid){
        this.organizationService.save(this.organization).subscribe({

        });
      }
    });
  }

  async checkAllIsValid():Promise<boolean>{
    if(
      !this.organization.orgName ||
      !this.organization.orgDescription
    ){
      this.showErrorMessage('txt_complete_all_fields');
      return false;
    }
    return true;
  }

  private showErrorMessage(message:string){
    this.toasterService.show({
      type:ToasterEnum.ERROR,
      message: message,
      header:'txt_error',
    });
  }

  private showSuccessMessage(message:string){
    this.toasterService.show({
      type:ToasterEnum.SUCCESS,
      message:message,
      header:"txt_success"
    });
  }
}
