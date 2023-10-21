import { Component, OnInit } from '@angular/core';
import { AdmPermission, AdmPermissionDto, AdmRolePermission } from 'src/app/data/models/admin';
import { ToasterEnum } from 'src/app/global/toaster-enum';
import { AdmPermissionService } from 'src/app/services/adm/adm-permission.service';
import { ToasterService } from 'src/app/services/oth/toaster.service';

enum PermissionType {
  ALL,
  READ,
  CREATE,
  UPDATE,
  DELETE
}

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  permissionType = PermissionType;

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
      rolePermission.parentPermissionId = permission.parentPermissionId;

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

  onPermissionChange(event: Event | boolean, type: PermissionType, index: number) {
    let checked = event instanceof Event ? (event.target as HTMLInputElement).checked : event;
    const permission = this.rolePermissions[index];
    if (!permission) return;

    if (type == PermissionType.ALL) {
      this.setCheck(checked, type, permission);
    }

    const brothersChecked = this.rolePermissions
      .filter(per => per.parentPermissionId == permission.parentPermissionId)
      .some(per => this.getCheckedValue(type, per));

    checked ||= brothersChecked;

    let currentParent = permission.parentPermissionId;

    // TODO: go backwards
    for (let i = index - 1; i >= 0; i--) {
      // brothers
      if (this.rolePermissions[i].parentPermissionId == currentParent) {
        // TODO: get value of checked here
        this.getCheckedValue(type, this.rolePermissions[i]);
        continue;
      }

      // parent
      if (this.rolePermissions[i].admPermission.permissionId == currentParent) {
        // set checked here
        currentParent = this.rolePermissions[i].parentPermissionId;
        // currentPermission = this.rolePermissions[i].admPermission.permissionId;
        this.setCheck(checked, type, this.rolePermissions[i]);
      }
    }

    // TODO: go forward
    let currentPermission = permission.admPermission.permissionId;
    const parents = new Set<number>()
      .add(currentPermission);

    for (let i = 0; i < this.rolePermissions.length; i++) {
      // check for children
      if (parents.has(this.rolePermissions[i].parentPermissionId)) {
        this.setCheck(checked, type, this.rolePermissions[i]);
        // children of this.rolePermissions[i] here
        parents.add(this.rolePermissions[i].admPermission.permissionId);
      }
    }
  }

  private setCheck(checked: boolean, permissionType: PermissionType, permission: AdmRolePermission) {
    switch (permissionType) {
      case PermissionType.READ:
        return permission.readPermission = checked;
      case PermissionType.CREATE:
        return permission.createPermission = checked;
      case PermissionType.UPDATE:
        return permission.updatePermission = checked;
      case PermissionType.DELETE:
        return permission.deletePermission = checked;
      case PermissionType.ALL:
        this.setCheck(checked, PermissionType.READ, permission);
        this.setCheck(checked, PermissionType.CREATE, permission);
        this.setCheck(checked, PermissionType.UPDATE, permission);
        this.setCheck(checked, PermissionType.DELETE, permission);
    }
    return;
  }

  private getCheckedValue(permissionType: PermissionType, permission: AdmRolePermission): boolean {
    switch (permissionType) {
      case PermissionType.READ:
        return permission.readPermission;
      case PermissionType.CREATE:
        return permission.createPermission;
      case PermissionType.UPDATE:
        return permission.updatePermission;
      case PermissionType.DELETE:
        return permission.deletePermission;
      case PermissionType.ALL:
        return this.getCheckedValue(PermissionType.READ, permission)
          && this.getCheckedValue(PermissionType.CREATE, permission)
          && this.getCheckedValue(PermissionType.UPDATE, permission)
          && this.getCheckedValue(PermissionType.DELETE, permission);
    }

    return true;
  }

  getAllChecked(index: number) {
    const permission = this.rolePermissions[index];
    if (!permission) return false;

    return permission.readPermission && permission.createPermission && permission.updatePermission && permission.deletePermission;
  }

  onSubmit() {
    console.log(this.rolePermissions);
  }
}
