import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HostelInfoDetail, Setting } from '../../../service/setting';

@Component({
  selector: 'app-hostel-information-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './hostel-information-list.html',
  styleUrl: './hostel-information-list.scss',
})
export class HostelInformationList implements OnInit {
  hostels: HostelInfoDetail[] = [];
  filteredHostels: HostelInfoDetail[] = [];

  // Filters
  searchQuery: string = '';
  selectedType: string = '';

  // Delete modal state
  showDeleteModal: boolean = false;
  hostelToDelete: HostelInfoDetail | null = null;

  constructor(private settingService: Setting) { }

  ngOnInit() {
    this.loadHostels();
  }

  loadHostels() {
    this.hostels = this.settingService.getHostelInfos();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredHostels = this.hostels.filter(h => {
      const matchesSearch = !this.searchQuery ? true : (
        h.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        h.code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        h.wardenName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      const matchesType = !this.selectedType ? true : h.type === this.selectedType;

      return matchesSearch && matchesType;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedType = '';
    this.applyFilters();
  }

  openDeleteModal(hostel: HostelInfoDetail, event: Event) {
    event.stopPropagation();
    this.hostelToDelete = hostel;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.hostelToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.hostelToDelete) {
      this.settingService.deleteHostelInfo(this.hostelToDelete.id);
      this.loadHostels();
      this.closeDeleteModal();
    }
  }
}

