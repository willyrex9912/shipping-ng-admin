import {Component, inject, OnInit} from '@angular/core';
import {AdmOrganization, AdmVehicle} from "../../../../data/models/admin";
import {AdmVehicleService} from "../../../../services/adm/adm-vehicle.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToasterService} from "../../../../services/oth/toaster.service";
import {ToasterEnum} from "../../../../global/toaster-enum";
import {AdmOrganizationService} from "../../../../services/adm/AdmOrganization.service";

enum VehicleStatus {
  ACTIVE = 10518,
  DECOMMISSIONED = 10519,
  MAINTENANCE = 10520,
  ON_ROUTE = 10521
}

@Component({
  selector: 'app-vehicles-create',
  templateUrl: './vehicles-create.component.html',
  styleUrls: ['./vehicles-create.component.scss']
})
export class VehiclesCreateComponent implements OnInit {

  private organizationService: AdmOrganizationService = inject(AdmOrganizationService);
  private vehicleService: AdmVehicleService = inject(AdmVehicleService);
  private toasterService: ToasterService = inject(ToasterService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  organizations!: AdmOrganization[];
  vehicle: AdmVehicle;
  vehicleId!: number;

  constructor() {
    this.vehicle = new AdmVehicle();
  }

  ngOnInit() {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('vehicleId') ?? 0);
    this.getOrganizations();
    if (this.vehicleId) this.findVehicleById(this.vehicleId);
  }

  findVehicleById(id: number) {
    this.vehicleService.findById(id).subscribe({
      next: (admVehicle) => {
        this.vehicle = admVehicle;
      },
      error: (error) => {
        this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'});
        void this.router.navigate(['/administration/vehicles']);
      }
    });
  }

  getOrganizations() {
    this.organizationService.findAll().subscribe({
      next: (data) => this.organizations = data ?? [],
      error: (error) => this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'})
    });
  }

  onSubmit() {
    if (!this.vehicle.organization.organizationId || !this.vehicle.categoryStatusId || !this.vehicle.avgCostPerKm || !this.vehicle.capacity)
      return this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_complete_all_fields'});

    this.vehicleService.save(this.vehicle).subscribe({
      next: _ => {
        this.toasterService.show({type: ToasterEnum.SUCCESS, message: 'txt_vehicle_saved'});
        void this.router.navigate(['/administration/vehicles']);
      },
      error: _ => this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'})
    });
  }
}
