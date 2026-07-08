import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RoomAllocation } from '../room-allocation/services/room-allocation';
import { Fee } from '../fee/service/fee';
import { Student } from '../student/services/student';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  // Stats
  totalStudents: number = 0;
  totalRooms: number = 0;
  occupiedRooms: number = 0;
  vacantRooms: number = 0;
  pendingFees: number = 0;
  pendingStudentsCount: number = 0;

  // Lists for display
  recentAllocations: any[] = [];
  hostelOccupancy: any[] = [];

  constructor(
    private studentService: Student,
    private allocationService: RoomAllocation,
    private feeService: Fee
  ) { }

  ngOnInit() {
    this.calculateStats();
    this.loadHostelOccupancy();
    this.loadRecentActivity();
  }

  calculateStats() {
    // Students count
    const students = this.studentService.getStudents();
    this.totalStudents = students.length;

    // Rooms occupancy
    const rooms = this.allocationService.getRooms();
    this.totalRooms = rooms.length;
    this.occupiedRooms = rooms.filter(r => r.occupied > 0).length;
    this.vacantRooms = rooms.filter(r => r.occupied === 0).length;

    // Pending payments
    const payments = this.feeService.getPayments();
    const fees = this.feeService.getFees();

    let sum = 0;
    const pendingStudentIds = new Set<string>();

    payments.forEach(p => {
      if (p.status === 'Unpaid' || p.status === 'Overdue') {
        const feeDef = fees.find(f => f.id === p.feeId);
        if (feeDef) {
          sum += feeDef.amount;
        }
        pendingStudentIds.add(p.studentId);
      }
    });

    this.pendingFees = sum;
    this.pendingStudentsCount = pendingStudentIds.size;
  }

  loadHostelOccupancy() {
    const hostels = this.allocationService.getHostels();
    this.hostelOccupancy = hostels.map(h => {
      const rooms = this.allocationService.getRooms(h.id);
      const capacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
      const occupied = rooms.reduce((sum, r) => sum + r.occupied, 0);

      let description = '';
      if (h.id === 'H-01') description = 'Double & triple sharing rooms, Boys Block';
      else if (h.id === 'H-02') description = 'Single & double sharing rooms, Girls Block';
      else description = 'Premium single & double PG rooms, Co-Ed';

      return {
        id: h.id,
        name: h.name,
        type: h.type,
        capacity,
        occupied,
        description
      };
    });
  }

  loadRecentActivity() {
    const allocations = this.allocationService.getAllocations();
    this.recentAllocations = [...allocations]
      .sort((a, b) => b.id.localeCompare(a.id))
      .slice(0, 4)
      .map(alc => {
        return {
          id: alc.id,
          studentName: alc.studentName,
          hostelName: alc.hostelName,
          roomNumber: alc.roomNumber,
          checkInDate: alc.checkInDate,
          status: alc.status
        };
      });
  }
}

