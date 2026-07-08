import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAllocationAddEdit } from './room-allocation-add-edit';

describe('RoomAllocationAddEdit', () => {
  let component: RoomAllocationAddEdit;
  let fixture: ComponentFixture<RoomAllocationAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAllocationAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAllocationAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
