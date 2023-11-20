export class AdmOrganization {
  organizationId!: number;
  orgName!: string;
  orgDescription!: string;
}

export class AdmPermission {
  public permissionId!: number;
  public parentPermission!: AdmPermission;
  public internalId!: number;
  public name!: string;
  public sref!: string;
  public icon!: string;
  public priority!: number;
}

export class AdmPermissionDto {
  public permissionId!: number;
  public parentPermissionId!: number;
  public internalId!: number;
  public name!: string;
  public sref!: string;
  public icon!: string;
  public priority!: number;

  // just for frontend
  public level!: number;
}

export class AdmRoleDto {
  public roleId!: number;
  public name!: string;
  public description!: string;
  public hourlyFee!: number;
}

export class AdmRole {
  public roleId!: number;
  public organizationId!: number;
  public subOrganizationId!: number;
  public name!: string;
  public description!: string;
  public hourlyFee!: number;
  public rolePermissions: AdmRolePermission[] = [];
}

export class AdmRolePermission {
  public rolePermissionId!: number;
  public permission!: AdmPermission;
  public readPermission!: boolean;
  public createPermission!: boolean;
  public updatePermission!: boolean;
  public deletePermission!: boolean;

  // just for frontend
  public level!: number;
  public parentPermissionId!: number;
}

export class AdmPackage {
  public packageId!:number;
  public weight!:number;
  public description!:string;
  public entryDate!:string;
  public estimatedCost!:number;
  public sourceOrganization!:AdmOrganization;
  public targetOrganization!:AdmOrganization;
  public sourceCustomerName!:string;
  public sourceCustomerContact!:string;
  public targetCustomerName!:string;
  public targetCustomerContact!:string;
  public packageCode!:string;
}

export class AdmPackageDto {
  public packageId!:number;
  public weight!:number;
  public description!:string;
  public estimatedCost!:number;
  public sourceOrganizationName!:string;
  public targetOrganizationName!:string;
  public sourceCustomerName!:string;
  public sourceCustomerContact!:string;
  public targetCustomerName!:string;
  public targetCustomerContact!:string;
  public packageCode!:string;
}

export class AdmOperationCost {
  public operationCostId!:number;
  public organization!:AdmOrganization;
  public subOrganization!:AdmOrganization;
  public categoryCost!:AdmCategory;
  public amount!:number;
  public entryDate!:string;
}

export class AdmOperationCostDto {
  public operationCostId!:number;
  public categoryCost!:AdmCategory;
  public amount!:number;
  public entryDate!:string;
}

export class AdmCategory {
  public categoryId!:number;
  public parentCategoryId!:number;
  public internalId!:number;
  public description!:string;
}

export class RequestRoleRoutesDto {
  public rolIds!: number[];
}

export class AdmRoleRouteDto {
  public permissionId!: number;
  public routeRef!: string;
}

export class AdmVehicle {
  public vehicleId!: number;
  public capacity!: number;
  public avgCostPerKm!: number;
  public avgSpeed!: number;
  public vehicleCategoryId!: number;
  public statusCategoryId!: number;
  public organization?: AdmOrganization;

  constructor() {
    this.organization = new AdmOrganization();
  }
}

export class AdmParameter {
  public parameterId!: number;
  public value!: string;
  public description!: string;
  public parameterCategoryId!: number;
  public AdmOrganization?: AdmOrganization;

  constructor() {
    this.AdmOrganization = new AdmOrganization();
  }
}

export class AdmUser {
  public userId!: number;
  public organization: AdmOrganization;
  public subOrganization?: AdmOrganization;
  public fullName!: string;
  public password!: string;
  public email!: string;
  public address?: string;
  public cui!: string;
  public userRoles?: AdmUserRol[];
  public roles?: RolUserDto[];

  constructor() {
    this.organization = new AdmOrganization();
    this.subOrganization = new AdmOrganization();
    this.userRoles = [];
    this.roles = [];
  }
}

export class AdmUserRol {
  public userRolId!: number;
  public user?: AdmUser;
  public rol?: AdmRole;
  public entryDate!: string;

  constructor() {
    this.user = new AdmUser();
    this.rol = new AdmRole();
  }
}

export class RolUserDto {
  public rolId!: number;
  public rolName!: string;
}

export class AdmRolePermissionDto {
  public permissionId!:number;
  public internalId!:number;
  public createPermission!:boolean;
  public deletePermission!:boolean;
  public readPermission!:boolean;
  public updatePermission!:boolean;
}
