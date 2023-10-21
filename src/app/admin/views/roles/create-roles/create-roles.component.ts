import { Component, OnInit } from '@angular/core';
import { AdmPermission, AdmPermissionDto, AdmRolePermission } from 'src/app/data/models/admin';
import { ToasterEnum } from 'src/app/global/toaster-enum';
import { AdmPermissionService } from 'src/app/services/adm/adm-permission.service';
import { ToasterService } from 'src/app/services/oth/toaster.service';

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {

  private MAIN_PARENT_PERMISSION = 5100;
  rolePermissions: AdmRolePermission[] = [];

  constructor(
    private permissionService: AdmPermissionService,
    private toastService: ToasterService
  ) {
  }

  ngOnInit(): void {
    this.permissionService.findAll(
      new Map<string, string>()
        .set('page', '0')
        .set('size', '0')
    ).subscribe({
      next: (response) => {
        const permissions = response.body ?? [];
        this.rolePermissions = this.toRolePermissions(permissions);
        const total = Number(response.headers.get('X-Total-Count') ?? 0);
      },
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    });
  }

  private toRolePermissions(permissions: AdmPermissionDto[]) {
    const result: AdmPermissionDto[] = [];

    const tmp: AdmPermissionDto[] = [];
    const parents = permissions.reduce((fathers: AdmPermissionDto[], curPermission: AdmPermissionDto) => {
      if (curPermission.parentPermissionId == this.MAIN_PARENT_PERMISSION) {
        curPermission.level = 0;
        fathers.push(curPermission);
      } else {
        tmp.push(curPermission);
      }
      return fathers;
    }, [])
      .sort((a, b) => a.priority - b.priority);

    parents.forEach(parent => {
      result.push(parent);
      result.push(...this.processPermissionAux(parent, tmp, 1));
    });

    return result.map(permission => {
      const rolePermission = new AdmRolePermission();
      rolePermission.admPermission = new AdmPermission();
      rolePermission.admPermission = Object.assign(rolePermission.admPermission, permission);

      rolePermission.readPermission = false;
      rolePermission.createPermission = false;
      rolePermission.updatePermission = false;
      rolePermission.deletePermission = false;
      return rolePermission;
    });
  }

  private processPermissionAux(parent: AdmPermissionDto, permissions: AdmPermissionDto[], level: number): AdmPermissionDto[] {
    const result: AdmPermissionDto[] = [];
    const tmp: AdmPermissionDto[] = [];

    const children = permissions.reduce((child: AdmPermissionDto[], curPermission: AdmPermissionDto) => {
      if (curPermission.parentPermissionId === parent.permissionId) {
        curPermission.level = level;
        child.push(curPermission);
      } else {
        tmp.push(curPermission);
      }
      return child;
    }, [])
      .sort((a, b) => a.priority - b.priority);

    children.forEach(permission => {
      result.push(permission);
      result.push(...this.processPermissionAux(permission, tmp, level + 1));
    });

    return result;
  }

  getBlank(level: number) {
    return Array(level).fill(4);
  }
}
