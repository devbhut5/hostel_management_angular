import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelInformationAddEdit } from './hostel-information-add-edit';

describe('HostelInformationAddEdit', () => {
  let component: HostelInformationAddEdit;
  let fixture: ComponentFixture<HostelInformationAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelInformationAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelInformationAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
