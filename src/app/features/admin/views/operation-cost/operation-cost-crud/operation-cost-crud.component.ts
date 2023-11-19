import {Component, OnInit} from '@angular/core';
import {AdmCategory, AdmOperationCost} from "../../../../../data/models/admin";
import {ToasterService} from "../../../../../services/oth/toaster.service";
import {Router} from "@angular/router";
import {AdmOperationCostService} from "../../../../../services/adm/adm-operation-cost.service";
import {AdmCategoryService} from "../../../../../services/adm/adm-category.service";
import {CategoryEnum} from "../../../../../global/category-enum";

@Component({
  selector: 'app-operation-cost-crud',
  templateUrl: './operation-cost-crud.component.html',
  styleUrls: ['./operation-cost-crud.component.scss']
})
export class OperationCostCrudComponent implements OnInit {

  operationCost!:AdmOperationCost;
  categories!:AdmCategory[];

  constructor(
    private toasterService:ToasterService,
    private router:Router,
    private operationCostService:AdmOperationCostService,
    private categoryService:AdmCategoryService,
  ) {
  }

  ngOnInit(): void {
    this.operationCost = new AdmOperationCost();
    this.findAllData();
  }

  findAllData(){
    this.categoryService.findByParentInternalId(CategoryEnum.OPERATION_COST_CATEGORY).subscribe({
      next: (categories) => {
        this.categories = categories ?? [];
      }, error: _ => { this.toasterService.showDefaultErrorMessage(); }
    })
  }

  save(){
    this.checkAllIsValid().then(allisValid => {
      if(allisValid){
        this.operationCostService.save(this.operationCost).subscribe({
          next: () => {
            this.toasterService.showSuccessMessage('txt_entity_saved');
            this.router.navigate(['../administration/operation-costs']);
          }, error: _ => {
            this.toasterService.showDefaultErrorMessage();
          }
        });
      }
    });
  }

  async checkAllIsValid():Promise<boolean>{
    if(
      !this.operationCost.categoryCost ||
      !this.operationCost.amount
    ){
      this.toasterService.showErrorMessage('txt_complete_all_fields');
      return false;
    }
    return true;
  }

}
