import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationView } from './room-allocation-view';

describe('RoomAllocationView', () => {
  let component: RoomAllocationView;
  let fixture: ComponentFixture<RoomAllocationView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAllocationView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAllocationView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
