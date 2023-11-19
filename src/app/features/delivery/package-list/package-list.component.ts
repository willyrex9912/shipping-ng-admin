import {Component, OnInit} from '@angular/core';
import {AdmPackageDto} from "../../../data/models/admin";
import {AdmPackageService} from "../../../services/adm/adm-package.service";
import {ToasterService} from "../../../services/oth/toaster.service";

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent implements OnInit{

  packages:AdmPackageDto[] = [];

  constructor(
    private packageService:AdmPackageService,
    private toasterService:ToasterService,
  ) {
    this.packageService.findAll().subscribe({
      next: (packages) => {
        this.packages = packages.body ?? [];
      }, error: _ => {
        this.toasterService.showDefaultErrorMessage();
      }
    });
  }

  ngOnInit(): void {
  }

}
