import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeeConfig, Setting } from '../../../service/setting';

@Component({
  selector: 'app-fee-configuration-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './fee-configuration-list.html',
  styleUrl: './fee-configuration-list.scss',
})
export class FeeConfigurationList implements OnInit {
  configs: FeeConfig[] = [];
  filteredConfigs: FeeConfig[] = [];

  // Filters
  searchQuery: string = '';

  // Delete modal state
  showDeleteModal: boolean = false;
  configToDelete: FeeConfig | null = null;

  constructor(private settingService: Setting) { }

  ngOnInit() {
    this.loadConfigs();
  }

  loadConfigs() {
    this.configs = this.settingService.getFeeConfigs();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredConfigs = this.configs.filter(c => {
      const matchesSearch = !this.searchQuery ? true : (
        c.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.hostelName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        c.receiptPrefix.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      return matchesSearch;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.applyFilters();
  }

  openDeleteModal(config: FeeConfig, event: Event) {
    event.stopPropagation();
    this.configToDelete = config;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.configToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.configToDelete) {
      this.settingService.deleteFeeConfig(this.configToDelete.id);
      this.loadConfigs();
      this.closeDeleteModal();
    }
  }
}

