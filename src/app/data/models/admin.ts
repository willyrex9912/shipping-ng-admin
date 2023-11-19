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
  public categoryStatusId!: number;
  public organization: AdmOrganization;

  constructor() {
    this.organization = new AdmOrganization();
  }
}

export class AdmParameter {
  public parameterId!: number;
  public value!: string;
  public description!: string;
  public categoryParameterId!: number;
}
