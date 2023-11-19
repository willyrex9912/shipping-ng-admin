import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCostCrudComponent } from './operation-cost-crud.component';

describe('OperationCostCrudComponent', () => {
  let component: OperationCostCrudComponent;
  let fixture: ComponentFixture<OperationCostCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationCostCrudComponent]
    });
    fixture = TestBed.createComponent(OperationCostCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
