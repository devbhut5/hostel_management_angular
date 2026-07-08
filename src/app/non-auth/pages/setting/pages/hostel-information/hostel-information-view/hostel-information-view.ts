import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HostelInfoDetail, Setting } from '../../../service/setting';

@Component({
  selector: 'app-hostel-information-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './hostel-information-view.html',
  styleUrl: './hostel-information-view.scss',
})
export class HostelInformationView implements OnInit {
  hostel: HostelInfoDetail | undefined;
  hostelIdParam: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settingService: Setting
  ) { }

  ngOnInit() {
    this.hostelIdParam = this.route.snapshot.paramMap.get('id');
    if (this.hostelIdParam) {
      this.hostel = this.settingService.getHostelInfoById(this.hostelIdParam);
      if (!this.hostel) {
        this.router.navigate(['/setting/hostel-information']);
      }
    } else {
      this.router.navigate(['/setting/hostel-information']);
    }
  }

  getInitials(name: string): string {
    if (!name) return 'H';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
    }
    return parts[0].charAt(0).toUpperCase();
  }
}

