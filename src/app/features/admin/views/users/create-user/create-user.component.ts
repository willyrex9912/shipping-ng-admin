import {Component, inject, OnInit} from '@angular/core';
import {AdmUserService} from "../../../../../services/adm/adm-user.service";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmOrganization, AdmRole, AdmRoleDto, AdmUser, AdmUserRol, RolUserDto} from "../../../../../data/models/admin";
import {ToasterEnum} from "../../../../../global/toaster-enum";
import {map, Observable} from "rxjs";
import {AdmRoleService} from "../../../../../services/adm/adm-role.service";
import {HttpResponse} from "@angular/common/http";
import {AdmOrganizationService} from "../../../../../services/adm/adm-organization.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  private organizationService: AdmOrganizationService = inject(AdmOrganizationService);
  private toasterService: ToasterService = inject(ToasterService);
  private userService: AdmUserService = inject(AdmUserService);
  private roleService: AdmRoleService = inject(AdmRoleService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  $organizations!: Observable<AdmOrganization[]>;
  $subOrganizations!: Observable<AdmOrganization[]>;
  roles!: RolUserDto[];
  user: AdmUser;
  userId!: number;

  multiselect = {
    datasource: [],
    selectedItems: [],
    settings: {
      singleSelection: false,
      idField: 'rolId',
      textField: 'rolName',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'Deseleccionar todos',
      itemsShowLimit: 4,
      allowSearchFilter: false
    }
  }
  constructor() {
    this.user = new AdmUser();
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('userId') ?? 0);
    this.getOrganizations();
    this.getRoles();
    if (this.userId) this.findUserById(this.userId);
  }

  findUserById(id: number) {
    this.userService.findById(id).subscribe({
      next: (admUser) => {
        this.user = admUser;
      },
      error: (error) => {
        this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'});
        void this.router.navigate(['/administration/users']);
      }
    });
  }

  getOrganizations() {
    this.$organizations = this.organizationService.findOrganizationsByParentId(0);
  }

  getSubOrgs(event: any) {
    this.$subOrganizations = this.organizationService.findOrganizationsByParentId(event.target.value);
  }

  getRoles() {
    this.roleService.findAll().subscribe({
      next: (data) => {
        this.roles = data.body?.map(rolDto => ({ rolId: rolDto.roleId, rolName: rolDto.name })) ?? [];
        console.log(this.roles);
      }
    });
  }

  onSubmit() {
    if (!this.user.organization.organizationId || !this.user.subOrganization?.organizationId ||
        !this.user.fullName || !this.user.email || !this.user.password || !this.user.cui)
      return this.toasterService.show({type: ToasterEnum.WARNING, message: 'txt_complete_all_fields'});

    console.log(this.user);
    this.userService.save(this.user).subscribe({
      next: _ => {
        this.toasterService.show({type: ToasterEnum.SUCCESS, message: 'user.txt_saved'});
        void this.router.navigate(['/administration/users']);
      },
      error: _ => this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'})
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }

}
