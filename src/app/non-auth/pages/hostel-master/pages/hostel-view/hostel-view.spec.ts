import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelView } from './hostel-view';

describe('HostelView', () => {
  let component: HostelView;
  let fixture: ComponentFixture<HostelView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostelView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
