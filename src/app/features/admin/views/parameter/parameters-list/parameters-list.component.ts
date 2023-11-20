import {Component, inject, OnInit} from '@angular/core';
import {AdmParameterService} from "../../../../../services/adm/adm-parameter.service";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {AdmParameter} from "../../../../../data/models/admin";
import {ToasterEnum} from "../../../../../global/toaster-enum";

@Component({
  selector: 'app-parameters-list',
  templateUrl: './parameters-list.component.html',
  styleUrls: ['./parameters-list.component.scss']
})
export class ParametersListComponent implements OnInit{

  private parameterService: AdmParameterService = inject(AdmParameterService);
  private toastService: ToasterService = inject(ToasterService);

  parameters: AdmParameter[] = [];

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.parameterService.findAll().subscribe({
      next: (response) => {
        this.parameters = response.body ?? [];
        const total = Number(response.headers.get('X-Total-Count'));
      },
      error: _ => this.toastService.show({ type: ToasterEnum.ERROR, message: 'txt_server_error' })
    });
  }

}
