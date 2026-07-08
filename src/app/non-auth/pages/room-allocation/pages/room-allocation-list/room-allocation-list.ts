import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomAllocation, AllocationData, HostelInfo } from '../../services/room-allocation';

@Component({
  selector: 'app-room-allocation-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './room-allocation-list.html',
  styleUrl: './room-allocation-list.scss',
})
export class RoomAllocationList implements OnInit {
  allocations: AllocationData[] = [];
  filteredAllocations: AllocationData[] = [];
  hostels: HostelInfo[] = [];

  // Filter models
  searchQuery: string = '';
  selectedHostel: string = '';

  // Delete modal state
  showDeleteModal: boolean = false;
  allocationToDelete: AllocationData | null = null;

  constructor(private allocationService: RoomAllocation) {}

  ngOnInit() {
    this.hostels = this.allocationService.getHostels();
    this.loadAllocations();
  }

  loadAllocations() {
    this.allocations = this.allocationService.getAllocations();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredAllocations = this.allocations.filter(alloc => {
      const matchesSearch = !this.searchQuery ? true : (
        alloc.studentName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        alloc.studentId.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        alloc.roomNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        alloc.id.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      const matchesHostel = !this.selectedHostel ? true : alloc.hostelId === this.selectedHostel;

      return matchesSearch && matchesHostel;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedHostel = '';
    this.applyFilters();
  }

  openDeleteModal(allocation: AllocationData, event: Event) {
    event.stopPropagation();
    this.allocationToDelete = allocation;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.allocationToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.allocationToDelete) {
      this.allocationService.deleteAllocation(this.allocationToDelete.id);
      this.loadAllocations();
      this.closeDeleteModal();
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

