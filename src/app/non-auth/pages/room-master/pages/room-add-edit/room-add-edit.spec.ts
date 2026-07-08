import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomAddEdit } from './room-add-edit';

describe('RoomAddEdit', () => {
  let component: RoomAddEdit;
  let fixture: ComponentFixture<RoomAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
