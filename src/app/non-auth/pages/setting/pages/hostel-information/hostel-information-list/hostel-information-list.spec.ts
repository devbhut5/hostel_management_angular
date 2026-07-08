import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelInformationList } from './hostel-information-list';

describe('HostelInformationList', () => {
  let component: HostelInformationList;
  let fixture: ComponentFixture<HostelInformationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelInformationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelInformationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
