import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Fee, FeeData, StudentPayment } from '../../service/fee';

@Component({
  selector: 'app-fee-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './fee-view.html',
  styleUrl: './fee-view.scss',
})
export class FeeView implements OnInit {
  feeData: FeeData | undefined;
  payments: StudentPayment[] = [];
  feeIdParam: string | null = null;

  // Overview stats
  totalAllocated: number = 0;
  totalPaid: number = 0;
  totalUnpaid: number = 0;
  unpaidCount: number = 0;
  paidCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private feeService: Fee
  ) {}

  ngOnInit() {
    this.feeIdParam = this.route.snapshot.paramMap.get('id');
    if (this.feeIdParam) {
      this.feeData = this.feeService.getFeeById(this.feeIdParam);
      if (this.feeData) {
        this.payments = this.feeService.getPayments(this.feeIdParam);
        this.calculateStats();
      } else {
        this.router.navigate(['/fee']);
      }
    } else {
      this.router.navigate(['/fee']);
    }
  }

  private calculateStats() {
    if (!this.feeData) return;
    
    this.unpaidCount = this.payments.filter(p => p.status === 'Unpaid' || p.status === 'Overdue').length;
    this.paidCount = this.payments.filter(p => p.status === 'Paid').length;
    
    this.totalAllocated = this.payments.length * this.feeData.amount;
    this.totalPaid = this.payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + (p.paidAmount || this.feeData!.amount), 0);
    this.totalUnpaid = this.totalAllocated - this.totalPaid;
  }
}

