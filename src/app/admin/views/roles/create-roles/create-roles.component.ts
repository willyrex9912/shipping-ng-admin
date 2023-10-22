import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmPermission, AdmPermissionDto, AdmRole, AdmRolePermission } from 'src/app/data/models/admin';
import { ToasterEnum } from 'src/app/global/toaster-enum';
import { AdmPermissionService } from 'src/app/services/adm/adm-permission.service';
import { AdmRoleService } from 'src/app/services/adm/adm-role.service';
import { ToasterService } from 'src/app/services/oth/toaster.service';

enum PermissionType {
  ALL,
  READ,
  CREATE,
  UPDATE,
  DELETE
}

type TreeNode = {
  parent?: TreeNode,
  permission: AdmRolePermission,
  children: TreeNode[]
};

@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  private MAIN_PARENT_PERMISSION = 5100;
  permissionType = PermissionType;
  nodes: TreeNode[] = [];
  role!: AdmRole;
  roleId!: number;

  constructor(
    private permissionService: AdmPermissionService,
    private roleService: AdmRoleService,
    private toastService: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.role = new AdmRole();
  }

  ngOnInit(): void {
    this.roleId = Number(this.route.snapshot.paramMap.get('roleId') ?? 0);

    this.permissionService.findAll(
      new Map<string, string>()
        .set('page', '0')
        .set('size', '0')
    ).subscribe({
      next: (response) => {
        if (this.roleId) {
          this.roleService.findById(this.roleId).subscribe({
            next: (admRole) => {
              this.role = admRole;
              const permissions = response.body ?? [];
              this.nodes = this.toTreeNode(permissions);
            },
            error: _ => {
              this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' });
              void this.router.navigate(['/administration/roles']);
            }
          });
        } else {
          const permissions = response.body ?? [];
          this.nodes = this.toTreeNode(permissions);
        }
      },
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    });
  }

  private toTreeNode(permissions: AdmPermissionDto[]): TreeNode[] {
    const tmp: AdmPermissionDto[] = [];
    const result: TreeNode[] = permissions.reduce((tree: TreeNode[], curPermission: AdmPermissionDto) => {
      if (curPermission.parentPermissionId == this.MAIN_PARENT_PERMISSION) {
        tree.push({ permission: this.toRolePermission(curPermission, 0), children: [] });
      } else {
        tmp.push(curPermission);
      }
      return tree;
    }, [])
      .sort((a, b) => a.permission.permission.priority - b.permission.permission.priority);

    result.forEach(treeNode => {
      this.toTreeNodeAux(treeNode, tmp, 1);
    });

    return result;
  }

  private toTreeNodeAux(parent: TreeNode, permissions: AdmPermissionDto[], level: number) {
    const tmp: AdmPermissionDto[] = [];

    parent.children = permissions.reduce((tree: TreeNode[], curPermission: AdmPermissionDto) => {
      if (parent.permission.permission.permissionId === curPermission.parentPermissionId) {
        tree.push({ parent: parent, permission: this.toRolePermission(curPermission, level), children: [] });
      } else {
        tmp.push(curPermission);
      }
      return tree;
    }, [])
      .sort((a, b) => a.permission.permission.priority - b.permission.permission.priority);

    parent.children.forEach(treeNode => {
      this.toTreeNodeAux(treeNode, tmp, level + 1);
    });
  }

  private toRolePermission(permission: AdmPermissionDto, level: number) {
    if (this.roleId) {
      const permissionId = permission.permissionId;
      const originalPermission = this.role.rolePermissions.find(per => per.permission.permissionId == permissionId);
      if (originalPermission) {
        originalPermission.level = level;
        originalPermission.parentPermissionId = permission.parentPermissionId;
        return originalPermission;
      }
    }

    permission.level = level;
    const rolePermission = new AdmRolePermission();
    rolePermission.permission = new AdmPermission();
    rolePermission.permission = Object.assign(rolePermission.permission, permission);
    rolePermission.parentPermissionId = permission.parentPermissionId;

    rolePermission.readPermission = false;
    rolePermission.createPermission = false;
    rolePermission.updatePermission = false;
    rolePermission.deletePermission = false;
    return rolePermission;
  }

  getBlank(level: number) {
    return Array(level).fill(4);
  }

  onPermissionChange(event: Event | boolean, type: PermissionType, node: TreeNode) {
    let checked = event instanceof Event ? (event.target as HTMLInputElement).checked : event;
    if (!node || !node.permission) return;

    // check children
    this.checkChildren(checked, type, node);
    this.checkParent(checked, type, node);
  }

  private checkChildren(checked: boolean, permissionType: PermissionType, node: TreeNode) {
    this.setCheck(checked, permissionType, node.permission);
    node.children.forEach(child => this.checkChildren(checked, permissionType, child));
  }

  private checkParent(checked: boolean, permissionType: PermissionType, node: TreeNode | undefined) {
    if (!node || !node.parent) return;
    const parent = node.parent;
    const anyChecked = parent.children.some(treeNode => this.getCheckedValue(permissionType, treeNode.permission));

    this.setCheck(anyChecked, permissionType, parent.permission);
    this.checkParent(anyChecked, permissionType, parent);
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

    return false;
  }

  getAllChecked(node: TreeNode) {
    if (!node || !node.permission) return false;
    const permission = node.permission;
    return permission.readPermission && permission.createPermission && permission.updatePermission && permission.deletePermission;
  }

  private toRolePermissions(nodes: TreeNode[]): AdmRolePermission[] {
    return nodes.reduce((permissions: AdmRolePermission[], curNode: TreeNode) => {
      permissions.push(curNode.permission);
      permissions.push(...this.toRolePermissions(curNode.children));
      return permissions;
    }, []);
  }

  onSubmit() {
    if (!this.role.rolePermissions || !this.role.description || !this.role.hourlyFee) {
      return this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_complete_all_fields' });
    }

    this.role.rolePermissions = this.toRolePermissions(this.nodes);
    this.roleService.save(this.role).subscribe({
      next: _ => {
        this.toastService.show({ type: ToasterEnum.SUCCESS, message: 'txt_changes_save_successfully' });
        void this.router.navigate(['/administration/roles']);
      },
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    })
  }
}
