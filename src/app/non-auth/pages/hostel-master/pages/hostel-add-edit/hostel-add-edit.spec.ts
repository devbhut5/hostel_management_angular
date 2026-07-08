import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelAddEdit } from './hostel-add-edit';

describe('HostelAddEdit', () => {
  let component: HostelAddEdit;
  let fixture: ComponentFixture<HostelAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
