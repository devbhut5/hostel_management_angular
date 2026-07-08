import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelInformationView } from './hostel-information-view';

describe('HostelInformationView', () => {
  let component: HostelInformationView;
  let fixture: ComponentFixture<HostelInformationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelInformationView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelInformationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
