import {Component, Input, OnInit} from '@angular/core';
import {Permission} from "../../../global/permission";
import {AdmPermissionService} from "../../../services/adm/adm-permission.service";
import {PermissionType} from "../../../global/permission-type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  @Input() title:string = '';
  @Input() permission:Permission = Permission.NONE;
  @Input() createRoute: any[] | string | null = '';
  permissionType = PermissionType;
  showCreateButton:boolean = false;

  constructor(
    private permissionService:AdmPermissionService,
  ) {
  }

  ngOnInit(): void {
    this.showCreateButton = this.showButton(this.permissionType.CREATE);
  }

  showButton(type:PermissionType):boolean{
    if(this.permission != Permission.NONE){
      console.log(this.permission)
      console.log(this.permissionService.isNavigationAllowed(this.permission, type))
      return this.permissionService.isNavigationAllowed(this.permission, type);
    }else{
      return false;
    }
  }

}
