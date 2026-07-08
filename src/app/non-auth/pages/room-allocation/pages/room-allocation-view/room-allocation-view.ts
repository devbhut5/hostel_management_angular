import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomAllocation, AllocationData, RoomInfo } from '../../services/room-allocation';

@Component({
  selector: 'app-room-allocation-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './room-allocation-view.html',
  styleUrl: './room-allocation-view.scss',
})
export class RoomAllocationView implements OnInit {
  allocation: AllocationData | undefined;
  allocationIdParam: string | null = null;
  roomStats: RoomInfo | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private allocationService: RoomAllocation
  ) {}

  ngOnInit() {
    this.allocationIdParam = this.route.snapshot.paramMap.get('id');
    if (this.allocationIdParam) {
      this.allocation = this.allocationService.getAllocationById(this.allocationIdParam);
      if (this.allocation) {
        const rooms = this.allocationService.getRooms(this.allocation.hostelId);
        const room = rooms.find(r => r.roomNumber === this.allocation?.roomNumber);
        if (room) {
          this.roomStats = room;
        }
      } else {
        this.router.navigate(['/room-allocation']);
      }
    } else {
      this.router.navigate(['/room-allocation']);
    }
  }

  getInitials(name: string): string {
    if (!name) return 'S';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase();
  }
}

