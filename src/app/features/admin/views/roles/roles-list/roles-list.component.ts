import { Component, OnInit } from '@angular/core';
import { AdmRoleDto } from 'src/app/data/models/admin';
import { ToasterEnum } from 'src/app/global/toaster-enum';
import { AdmRoleService } from 'src/app/services/adm/adm-role.service';
import { ToasterService } from 'src/app/services/oth/toaster.service';
import {Permission} from "../../../../../global/permission";

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnInit {

  roles: AdmRoleDto[] = [];
  permission = Permission;

  constructor(
    private roleService: AdmRoleService,
    private toastService: ToasterService
  ) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.roleService.findAll().subscribe({
      next: (response) => {
        this.roles = response.body ?? [];
        const total = Number(response.headers.get('X-Total-Count'));
      },
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    });
  }

    protected readonly Permission = Permission;
}
