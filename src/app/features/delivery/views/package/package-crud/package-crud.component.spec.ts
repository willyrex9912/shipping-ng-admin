import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCrudComponent } from './package-crud.component';

describe('PackageCrudComponent', () => {
  let component: PackageCrudComponent;
  let fixture: ComponentFixture<PackageCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageCrudComponent]
    });
    fixture = TestBed.createComponent(PackageCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
