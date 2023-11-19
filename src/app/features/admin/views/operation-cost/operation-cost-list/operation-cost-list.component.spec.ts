import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCostListComponent } from './operation-cost-list.component';

describe('OperationCostListComponent', () => {
  let component: OperationCostListComponent;
  let fixture: ComponentFixture<OperationCostListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationCostListComponent]
    });
    fixture = TestBed.createComponent(OperationCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
