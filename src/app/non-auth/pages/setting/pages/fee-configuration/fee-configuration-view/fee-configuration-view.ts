import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FeeConfig, Setting } from '../../../service/setting';

@Component({
  selector: 'app-fee-configuration-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './fee-configuration-view.html',
  styleUrl: './fee-configuration-view.scss',
})
export class FeeConfigurationView implements OnInit {
  config: FeeConfig | undefined;
  configIdParam: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private settingService: Setting
  ) { }

  ngOnInit() {
    this.configIdParam = this.route.snapshot.paramMap.get('id');
    if (this.configIdParam) {
      this.config = this.settingService.getFeeConfigById(this.configIdParam);
      if (!this.config) {
        this.router.navigate(['/setting/fee-configuration']);
      }
    } else {
      this.router.navigate(['/setting/fee-configuration']);
    }
  }
}

