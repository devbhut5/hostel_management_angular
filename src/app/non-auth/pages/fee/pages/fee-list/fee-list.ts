import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fee, FeeData } from '../../service/fee';
import { RoomAllocation, HostelInfo } from '../../../room-allocation/services/room-allocation';

@Component({
  selector: 'app-fee-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './fee-list.html',
  styleUrl: './fee-list.scss',
})
export class FeeList implements OnInit {
  fees: FeeData[] = [];
  filteredFees: FeeData[] = [];
  hostels: HostelInfo[] = [];

  // Filters
  searchQuery: string = '';
  selectedHostel: string = '';

  // Delete modal state
  showDeleteModal: boolean = false;
  feeToDelete: FeeData | null = null;

  constructor(
    private feeService: Fee,
    private allocationService: RoomAllocation
  ) {}

  ngOnInit() {
    this.hostels = this.allocationService.getHostels();
    this.loadFees();
  }

  loadFees() {
    this.fees = this.feeService.getFees();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredFees = this.fees.filter(fee => {
      const matchesSearch = !this.searchQuery ? true : (
        fee.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        fee.type.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        fee.id.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      const matchesHostel = !this.selectedHostel ? true : fee.hostelId === this.selectedHostel;

      return matchesSearch && matchesHostel;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedHostel = '';
    this.applyFilters();
  }

  openDeleteModal(fee: FeeData, event: Event) {
    event.stopPropagation();
    this.feeToDelete = fee;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.feeToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.feeToDelete) {
      this.feeService.deleteFee(this.feeToDelete.id);
      this.loadFees();
      this.closeDeleteModal();
    }
  }
}

