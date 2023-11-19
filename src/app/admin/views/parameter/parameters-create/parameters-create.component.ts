import {Component, inject, OnInit} from '@angular/core';
import {AdmParameterService} from "../../../../services/adm/adm-parameter.service";
import {ToasterService} from "../../../../services/oth/toaster.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdmParameter} from "../../../../data/models/admin";
import {ToasterEnum} from "../../../../global/toaster-enum";

@Component({
  selector: 'app-parameters-create',
  templateUrl: './parameters-create.component.html',
  styleUrls: ['./parameters-create.component.scss']
})
export class ParametersCreateComponent implements OnInit{

  private parameterService: AdmParameterService = inject(AdmParameterService);
  private toasterService: ToasterService = inject(ToasterService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  parameter: AdmParameter;
  parameterId!: number;

  constructor() {
    this.parameter = new AdmParameter();
  }

  ngOnInit(): void {
    this.parameterId = Number(this.route.snapshot.paramMap.get('parameterId') ?? 0);
    if (this.parameterId) this.findParameterById(this.parameterId);
  }

  findParameterById(id: number) {
    this.parameterService.findById(id).subscribe({
      next: (admParameter) => {
        this.parameter = admParameter;
      },
      error: (error) => {
        this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'});
        void this.router.navigate(['/administration/parameters']);
      }
    });
  }

  onSubmit(){
    if (!this.parameter.value || !this.parameter.description || !this.parameter.categoryParameterId)
      return this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_complete_all_fields'});

    this.parameterService.save(this.parameter).subscribe({
      next: _ => {
        this.toasterService.show({type: ToasterEnum.SUCCESS, message: 'parameter.txt_saved'});
        void this.router.navigate(['/administration/parameters']);
      },
      error: (error) => this.toasterService.show({type: ToasterEnum.ERROR, message: 'txt_server_error'})
    });
  }

}
