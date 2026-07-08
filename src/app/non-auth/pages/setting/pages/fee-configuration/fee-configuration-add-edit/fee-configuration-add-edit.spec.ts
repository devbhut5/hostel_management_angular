import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeConfigurationAddEdit } from './fee-configuration-add-edit';

describe('FeeConfigurationAddEdit', () => {
  let component: FeeConfigurationAddEdit;
  let fixture: ComponentFixture<FeeConfigurationAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeConfigurationAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeConfigurationAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
