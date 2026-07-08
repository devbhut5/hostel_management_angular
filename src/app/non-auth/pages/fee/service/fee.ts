import { Injectable } from '@angular/core';

export interface FeeData {
  id: string;
  name: string;
  hostelId: string;
  hostelName: string;
  type: string;
  amount: number;
  frequency: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

export interface StudentPayment {
  id: string;
  feeId: string;
  studentId: string;
  studentName: string;
  dueDate: string;
  status: 'Paid' | 'Unpaid' | 'Overdue';
  paidAmount?: number;
  paymentDate?: string;
  paymentMethod?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Fee {
  private readonly FEE_KEY = 'hostel_fees';
  private readonly PAYMENTS_KEY = 'hostel_payments';

  constructor() {
    this.initMockFees();
    this.initMockPayments();
  }

  private initMockFees() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.FEE_KEY)) {
        const mockFees: FeeData[] = [
          {
            id: 'FEE-001',
            name: 'FY2026 Hostel Rent',
            hostelId: 'H-01',
            hostelName: 'Bose Hall of Residence',
            type: 'Hostel Fee',
            amount: 12000,
            frequency: 'Yearly',
            description: 'Annual room rental charges for single and double sharing occupancy.',
            status: 'Active'
          },
          {
            id: 'FEE-002',
            name: 'Security Deposit Block B',
            hostelId: 'H-02',
            hostelName: 'Gargi Hall of Residence',
            type: 'Security Deposit',
            amount: 5000,
            frequency: 'One Time',
            description: 'Refundable security caution deposit for new admissions.',
            status: 'Active'
          },
          {
            id: 'FEE-003',
            name: 'Electricity Advance Jul-26',
            hostelId: 'H-03',
            hostelName: 'Patel PG Block',
            type: 'Electricity Charge',
            amount: 1500,
            frequency: 'Monthly',
            description: 'Advance electrical utility estimation charge.',
            status: 'Active'
          }
        ];
        localStorage.setItem(this.FEE_KEY, JSON.stringify(mockFees));
      }
    }
  }

  private initMockPayments() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.PAYMENTS_KEY)) {
        const mockPayments: StudentPayment[] = [
          {
            id: 'PMT-001',
            feeId: 'FEE-001',
            studentId: 'STU-2026-001',
            studentName: 'Aarav Sharma',
            dueDate: '2026-07-15',
            status: 'Paid',
            paidAmount: 12000,
            paymentDate: '2026-07-01',
            paymentMethod: 'UPI'
          },
          {
            id: 'PMT-002',
            feeId: 'FEE-001',
            studentId: 'STU-2026-003',
            studentName: 'Kabir Singh',
            dueDate: '2026-07-15',
            status: 'Unpaid'
          },
          {
            id: 'PMT-003',
            feeId: 'FEE-002',
            studentId: 'STU-2026-002',
            studentName: 'Ananya Patel',
            dueDate: '2026-07-20',
            status: 'Paid',
            paidAmount: 5000,
            paymentDate: '2026-06-12',
            paymentMethod: 'Net Banking'
          },
          {
            id: 'PMT-004',
            feeId: 'FEE-003',
            studentId: 'STU-2026-001',
            studentName: 'Aarav Sharma',
            dueDate: '2026-08-01',
            status: 'Unpaid'
          }
        ];
        localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(mockPayments));
      }
    }
  }

  getFees(): FeeData[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.FEE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getFeeById(id: string): FeeData | undefined {
    return this.getFees().find(f => f.id === id);
  }

  addFee(fee: FeeData): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const fees = this.getFees();
      if (fees.some(f => f.id === fee.id)) {
        return false;
      }
      fees.push(fee);
      localStorage.setItem(this.FEE_KEY, JSON.stringify(fees));
      return true;
    }
    return false;
  }

  updateFee(fee: FeeData): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const fees = this.getFees();
      const index = fees.findIndex(f => f.id === fee.id);
      if (index === -1) {
        return false;
      }
      fees[index] = fee;
      localStorage.setItem(this.FEE_KEY, JSON.stringify(fees));
      return true;
    }
    return false;
  }

  deleteFee(id: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      let fees = this.getFees();
      const initialLength = fees.length;
      fees = fees.filter(f => f.id !== id);
      if (fees.length === initialLength) {
        return false;
      }
      localStorage.setItem(this.FEE_KEY, JSON.stringify(fees));
      
      let payments = this.getPayments();
      payments = payments.filter(p => p.feeId !== id);
      localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
      return true;
    }
    return false;
  }

  getPayments(feeId?: string): StudentPayment[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.PAYMENTS_KEY);
      const payments: StudentPayment[] = data ? JSON.parse(data) : [];
      if (feeId) {
        return payments.filter(p => p.feeId === feeId);
      }
      return payments;
    }
    return [];
  }

  addPayment(payment: StudentPayment): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const payments = this.getPayments();
      payments.push(payment);
      localStorage.setItem(this.PAYMENTS_KEY, JSON.stringify(payments));
      return true;
    }
    return false;
  }
}

