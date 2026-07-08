import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelList } from './hostel-list';

describe('HostelList', () => {
  let component: HostelList;
  let fixture: ComponentFixture<HostelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
