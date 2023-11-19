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
