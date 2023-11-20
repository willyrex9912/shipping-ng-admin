import {Component, inject, OnInit} from '@angular/core';
import {AdmVehicle} from "../../../../../data/models/admin";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {AdmVehicleService} from "../../../../../services/adm/adm-vehicle.service";
import {ToasterEnum} from "../../../../../global/toaster-enum";

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {

  private vehicleService: AdmVehicleService = inject(AdmVehicleService);
  private toastService: ToasterService = inject(ToasterService);

  vehicles: AdmVehicle[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.vehicleService.findAll().subscribe({
      next: (response) => {
        this.vehicles = response.body ?? [];
      },
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    });
  }

  getStatus(status: number): string {
    switch (status) {
      case 10518: return 'Activo';
      case 10519: return 'Fuera de servicio';
      case 10520: return 'En mantenimiento';
      case 10521: return 'En ruta';
      default: return 'Estado desconocido';
    }
  }

}
