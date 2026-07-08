import { TestBed } from '@angular/core/testing';

import { RoomAllocation } from './room-allocation';

describe('RoomAllocation', () => {
  let service: RoomAllocation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomAllocation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
