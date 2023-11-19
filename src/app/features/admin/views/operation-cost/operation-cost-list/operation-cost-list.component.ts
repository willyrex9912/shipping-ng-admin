import {Component, OnInit} from '@angular/core';
import {AdmOperationCostService} from "../../../../../services/adm/adm-operation-cost.service";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {AdmOperationCostDto} from "../../../../../data/models/admin";

@Component({
  selector: 'app-operation-cost-list',
  templateUrl: './operation-cost-list.component.html',
  styleUrls: ['./operation-cost-list.component.scss']
})
export class OperationCostListComponent implements OnInit {

  costs:AdmOperationCostDto[] = [];

  constructor(
    private operationCostService:AdmOperationCostService,
    private toasterService:ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.operationCostService.findAll().subscribe({
      next: (costs) => {
        this.costs = costs.body ?? [];
      }, error: _ => {
        this.toasterService.showDefaultErrorMessage();
      }
    });
  }

}
