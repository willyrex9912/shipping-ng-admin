import {Component, OnInit} from '@angular/core';
import {AdmOrganization, AdmPackage} from "../../../../../data/models/admin";
import {AdmPackageService} from "../../../../../services/adm/adm-package.service";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {Router} from "@angular/router";
import {AdmOrganizationService} from "../../../../../services/adm/adm-organization.service";

@Component({
  selector: 'app-package-crud',
  templateUrl: './package-crud.component.html',
  styleUrls: ['./package-crud.component.scss']
})
export class PackageCrudComponent implements OnInit {

  package!:AdmPackage;
  organizations!:AdmOrganization[];

  constructor(
    private packageService:AdmPackageService,
    private toasterService:ToasterService,
    private router:Router,
    private organizationService:AdmOrganizationService,
  ) {
  }

  ngOnInit() {
    this.package = new AdmPackage();
    this.findAllData();
  }

  findAllData(){
    this.organizationService.findAll().subscribe({
      next: (organizations) => {
        this.organizations = organizations ?? [];
      }, error: _ => { this.toasterService.showDefaultErrorMessage(); }
    })
  }

  save(){
    this.checkAllIsValid().then(allisValid => {
      if(allisValid){
        this.packageService.save(this.package).subscribe({
          next: () => {
            this.toasterService.showSuccessMessage('txt_entity_saved');
            this.router.navigate(['../delivery/packages']);
          }, error: _ => {
            this.toasterService.showDefaultErrorMessage();
          }
        });
      }
    });
  }

  async checkAllIsValid():Promise<boolean>{
    if(
      !this.package.description ||
      !this.package.weight ||
      !this.package.description ||
      !this.package.sourceOrganization ||
      !this.package.targetOrganization ||
      !this.package.sourceCustomerName ||
      !this.package.sourceCustomerContact ||
      !this.package.targetCustomerName ||
      !this.package.targetCustomerContact
    ){
      this.toasterService.showErrorMessage('txt_complete_all_fields');
      return false;
    }
    return true;
  }

}
