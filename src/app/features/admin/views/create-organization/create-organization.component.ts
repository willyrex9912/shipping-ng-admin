import {Component} from "@angular/core";
import {AdmOrganization} from "../../../../data/models/admin";
import {AdmOrganizationService} from "../../../../services/adm/adm-organization.service";
import {ToasterService} from "../../../../services/oth/toaster.service";
import {Router} from "@angular/router";
import {ToasterEnum} from "../../../../global/toaster-enum";


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
    private router:Router,
  ) {
    this.organization = new AdmOrganization();
  }

  save(){
    this.checkAllIsValid().then(allisValid => {
      if(allisValid){
        this.organizationService.save(this.organization).subscribe({
          next: () => {
            this.showSuccessMessage('txt_entity_saved');
            this.router.navigate(['../administration/organizations']);
          }, error: _ => {
            this.showErrorMessage('txt_server_error');
          }
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
