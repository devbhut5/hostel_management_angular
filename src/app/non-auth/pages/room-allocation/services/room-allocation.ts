import { Injectable } from '@angular/core';

export interface AllocationData {
  id: string;
  studentId: string;
  studentName: string;
  course: string;
  hostelId: string;
  hostelName: string;
  roomNumber: string;
  checkInDate: string;
  expectedCheckOutDate: string;
  remarks?: string;
  status: 'Active' | 'Checked Out';
}

export interface HostelInfo {
  id: string;
  name: string;
  type: string;
}

export interface RoomInfo {
  hostelId: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
}

@Injectable({
  providedIn: 'root',
})
export class RoomAllocation {
  private readonly ALLOCATIONS_KEY = 'hostel_allocations';
  private readonly ROOMS_KEY = 'hostel_rooms';

  private defaultHostels: HostelInfo[] = [
    { id: 'H-01', name: 'Bose Hall of Residence', type: 'Boys' },
    { id: 'H-02', name: 'Gargi Hall of Residence', type: 'Girls' },
    { id: 'H-03', name: 'Patel PG Block', type: 'Co-Ed' }
  ];

  constructor() {
    this.initRooms();
    this.initMockAllocations();
  }

  private initRooms() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.ROOMS_KEY)) {
        const defaultRooms: RoomInfo[] = [
          // Bose Hall
          { hostelId: 'H-01', roomNumber: '101', capacity: 2, occupied: 1 },
          { hostelId: 'H-01', roomNumber: '102', capacity: 2, occupied: 2 },
          { hostelId: 'H-01', roomNumber: '103', capacity: 1, occupied: 0 },
          { hostelId: 'H-01', roomNumber: '201', capacity: 3, occupied: 1 },
          // Gargi Hall
          { hostelId: 'H-02', roomNumber: '101', capacity: 2, occupied: 0 },
          { hostelId: 'H-02', roomNumber: '102', capacity: 2, occupied: 1 },
          { hostelId: 'H-02', roomNumber: '201', capacity: 1, occupied: 1 },
          // Patel PG Block
          { hostelId: 'H-03', roomNumber: '101', capacity: 2, occupied: 1 },
          { hostelId: 'H-03', roomNumber: '102', capacity: 1, occupied: 0 }
        ];
        localStorage.setItem(this.ROOMS_KEY, JSON.stringify(defaultRooms));
      }
    }
  }

  private initMockAllocations() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.ALLOCATIONS_KEY)) {
        const mockAllocations: AllocationData[] = [
          {
            id: 'ALC-001',
            studentId: 'STU-2026-001',
            studentName: 'Aarav Sharma',
            course: 'B.Tech',
            hostelId: 'H-01',
            hostelName: 'Bose Hall of Residence',
            roomNumber: '101',
            checkInDate: '2025-07-20',
            expectedCheckOutDate: '2026-05-30',
            remarks: 'Allocated single bed in double room.',
            status: 'Active'
          },
          {
            id: 'ALC-002',
            studentId: 'STU-2026-002',
            studentName: 'Ananya Patel',
            course: 'BCA',
            hostelId: 'H-02',
            hostelName: 'Gargi Hall of Residence',
            roomNumber: '102',
            checkInDate: '2026-06-15',
            expectedCheckOutDate: '2027-05-15',
            remarks: 'Requires desk near window.',
            status: 'Active'
          }
        ];
        localStorage.setItem(this.ALLOCATIONS_KEY, JSON.stringify(mockAllocations));
      }
    }
  }

  getHostels(): HostelInfo[] {
    return this.defaultHostels;
  }

  getRooms(hostelId?: string): RoomInfo[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.ROOMS_KEY);
      const rooms: RoomInfo[] = data ? JSON.parse(data) : [];
      if (hostelId) {
        return rooms.filter(r => r.hostelId === hostelId);
      }
      return rooms;
    }
    return [];
  }

  getAllocations(): AllocationData[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.ALLOCATIONS_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getAllocationById(id: string): AllocationData | undefined {
    return this.getAllocations().find(a => a.id === id);
  }

  addAllocation(allocation: AllocationData): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const allocations = this.getAllocations();
      if (allocations.some(a => a.id === allocation.id)) {
        return false;
      }
      
      const rooms = this.getRooms();
      const room = rooms.find(r => r.hostelId === allocation.hostelId && r.roomNumber === allocation.roomNumber);
      if (room && room.occupied < room.capacity) {
        room.occupied++;
        localStorage.setItem(this.ROOMS_KEY, JSON.stringify(rooms));
      }

      allocations.push(allocation);
      localStorage.setItem(this.ALLOCATIONS_KEY, JSON.stringify(allocations));
      return true;
    }
    return false;
  }

  updateAllocation(allocation: AllocationData): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const allocations = this.getAllocations();
      const oldAllocation = allocations.find(a => a.id === allocation.id);
      if (!oldAllocation) {
        return false;
      }

      const rooms = this.getRooms();

      if (oldAllocation.hostelId !== allocation.hostelId || oldAllocation.roomNumber !== allocation.roomNumber) {
        const oldRoom = rooms.find(r => r.hostelId === oldAllocation.hostelId && r.roomNumber === oldAllocation.roomNumber);
        if (oldRoom && oldRoom.occupied > 0) {
          oldRoom.occupied--;
        }

        const newRoom = rooms.find(r => r.hostelId === allocation.hostelId && r.roomNumber === allocation.roomNumber);
        if (newRoom && newRoom.occupied < newRoom.capacity) {
          newRoom.occupied++;
        }
      } else if (oldAllocation.status !== allocation.status) {
        const room = rooms.find(r => r.hostelId === allocation.hostelId && r.roomNumber === allocation.roomNumber);
        if (room) {
          if (allocation.status === 'Checked Out' && oldAllocation.status === 'Active') {
            room.occupied = Math.max(0, room.occupied - 1);
          } else if (allocation.status === 'Active' && oldAllocation.status === 'Checked Out') {
            room.occupied = Math.min(room.capacity, room.occupied + 1);
          }
        }
      }

      localStorage.setItem(this.ROOMS_KEY, JSON.stringify(rooms));

      const index = allocations.findIndex(a => a.id === allocation.id);
      allocations[index] = allocation;
      localStorage.setItem(this.ALLOCATIONS_KEY, JSON.stringify(allocations));
      return true;
    }
    return false;
  }

  deleteAllocation(id: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      let allocations = this.getAllocations();
      const allocation = allocations.find(a => a.id === id);
      if (!allocation) {
        return false;
      }

      if (allocation.status === 'Active') {
        const rooms = this.getRooms();
        const room = rooms.find(r => r.hostelId === allocation.hostelId && r.roomNumber === allocation.roomNumber);
        if (room && room.occupied > 0) {
          room.occupied--;
          localStorage.setItem(this.ROOMS_KEY, JSON.stringify(rooms));
        }
      }

      allocations = allocations.filter(a => a.id !== id);
      localStorage.setItem(this.ALLOCATIONS_KEY, JSON.stringify(allocations));
      return true;
    }
    return false;
  }
}

