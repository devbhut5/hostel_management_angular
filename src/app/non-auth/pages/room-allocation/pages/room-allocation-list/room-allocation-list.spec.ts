import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationList } from './room-allocation-list';

describe('RoomAllocationList', () => {
  let component: RoomAllocationList;
  let fixture: ComponentFixture<RoomAllocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAllocationList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAllocationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
