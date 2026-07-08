import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeAddEdit } from './fee-add-edit';

describe('FeeAddEdit', () => {
  let component: FeeAddEdit;
  let fixture: ComponentFixture<FeeAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeeAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
