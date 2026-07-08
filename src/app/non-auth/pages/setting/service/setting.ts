import { Injectable } from '@angular/core';

export interface HostelInfoDetail {
  id: string;
  name: string;
  code: string;
  type: 'Boys' | 'Girls' | 'Both';
  address: string;
  city: string;
  state: string;
  pincode: string;
  contactNumber: string;
  email?: string;
  wardenName: string;
  wardenMobile: string;
  logo?: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

export interface FeeConfig {
  id: string;
  name: string;
  hostelId: string;
  hostelName: string;
  defaultHostelFee: number;
  securityDeposit: number;
  lateFeePerDay: number;
  currency: string;
  paymentDueDays: number;
  receiptPrefix: string;
  status: 'Active' | 'Inactive';
}

@Injectable({
  providedIn: 'root',
})
export class Setting {
  private readonly HOSTEL_INFO_KEY = 'hostel_info_details';
  private readonly FEE_CONFIG_KEY = 'global_fee_configs';

  constructor() {
    this.initMockHostelInfo();
    this.initMockFeeConfig();
  }

  private initMockHostelInfo() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.HOSTEL_INFO_KEY)) {
        const mockInfos: HostelInfoDetail[] = [
          {
            id: 'HINF-001',
            name: 'Bose Hall of Residence',
            code: 'BH-01',
            type: 'Boys',
            address: 'Sector 12, Academic Area, Main Campus',
            city: 'Kharagpur',
            state: 'West Bengal',
            pincode: '721302',
            contactNumber: '03222-282201',
            email: 'warden.bose@inst.ac.in',
            wardenName: 'Dr. R. K. Sharma',
            wardenMobile: '9876543210',
            description: 'Undergraduate boys hostel named after Acharya Jagadish Chandra Bose.',
            status: 'Active'
          },
          {
            id: 'HINF-002',
            name: 'Gargi Hall of Residence',
            code: 'GH-02',
            type: 'Girls',
            address: 'Sector 14, Residential Area, North Campus',
            city: 'Kharagpur',
            state: 'West Bengal',
            pincode: '721302',
            contactNumber: '03222-282202',
            email: 'warden.gargi@inst.ac.in',
            wardenName: 'Dr. Sunita Patel',
            wardenMobile: '8765432109',
            description: 'Undergraduate girls hostel with clean single and double sharing facilities.',
            status: 'Active'
          },
          {
            id: 'HINF-003',
            name: 'Patel PG Block',
            code: 'PG-03',
            type: 'Both',
            address: 'Sector 5, East Campus Gate, Main Street',
            city: 'Kharagpur',
            state: 'West Bengal',
            pincode: '721302',
            contactNumber: '03222-282203',
            email: 'warden.patel@inst.ac.in',
            wardenName: 'Mr. Amit Verma',
            wardenMobile: '7654321098',
            description: 'Co-ed post-graduate accommodation block with modern kitchen amenities.',
            status: 'Active'
          }
        ];
        localStorage.setItem(this.HOSTEL_INFO_KEY, JSON.stringify(mockInfos));
      }
    }
  }

  private initMockFeeConfig() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.FEE_CONFIG_KEY)) {
        const mockConfigs: FeeConfig[] = [
          {
            id: 'FCFG-001',
            name: 'Bose Hall Fee Policy',
            hostelId: 'H-01',
            hostelName: 'Bose Hall of Residence',
            defaultHostelFee: 12000,
            securityDeposit: 5000,
            lateFeePerDay: 50,
            currency: 'INR',
            paymentDueDays: 15,
            receiptPrefix: 'REC-BH-',
            status: 'Active'
          },
          {
            id: 'FCFG-002',
            name: 'Gargi Hall Fee Policy',
            hostelId: 'H-02',
            hostelName: 'Gargi Hall of Residence',
            defaultHostelFee: 15000,
            securityDeposit: 6000,
            lateFeePerDay: 50,
            currency: 'INR',
            paymentDueDays: 15,
            receiptPrefix: 'REC-GH-',
            status: 'Active'
          },
          {
            id: 'FCFG-003',
            name: 'Patel PG Fee Policy',
            hostelId: 'H-03',
            hostelName: 'Patel PG Block',
            defaultHostelFee: 18000,
            securityDeposit: 8000,
            lateFeePerDay: 100,
            currency: 'INR',
            paymentDueDays: 10,
            receiptPrefix: 'REC-PG-',
            status: 'Active'
          }
        ];
        localStorage.setItem(this.FEE_CONFIG_KEY, JSON.stringify(mockConfigs));
      }
    }
  }

  // Hostel Info CRUD
  getHostelInfos(): HostelInfoDetail[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.HOSTEL_INFO_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getHostelInfoById(id: string): HostelInfoDetail | undefined {
    return this.getHostelInfos().find(h => h.id === id);
  }

  addHostelInfo(info: HostelInfoDetail): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const infos = this.getHostelInfos();
      if (infos.some(i => i.id === info.id)) {
        return false;
      }
      infos.push(info);
      localStorage.setItem(this.HOSTEL_INFO_KEY, JSON.stringify(infos));
      return true;
    }
    return false;
  }

  updateHostelInfo(info: HostelInfoDetail): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const infos = this.getHostelInfos();
      const index = infos.findIndex(i => i.id === info.id);
      if (index === -1) {
        return false;
      }
      infos[index] = info;
      localStorage.setItem(this.HOSTEL_INFO_KEY, JSON.stringify(infos));
      return true;
    }
    return false;
  }

  deleteHostelInfo(id: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      let infos = this.getHostelInfos();
      const initialLength = infos.length;
      infos = infos.filter(i => i.id !== id);
      if (infos.length === initialLength) {
        return false;
      }
      localStorage.setItem(this.HOSTEL_INFO_KEY, JSON.stringify(infos));
      return true;
    }
    return false;
  }

  // Fee Config CRUD
  getFeeConfigs(): FeeConfig[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.FEE_CONFIG_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getFeeConfigById(id: string): FeeConfig | undefined {
    return this.getFeeConfigs().find(c => c.id === id);
  }

  addFeeConfig(config: FeeConfig): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configs = this.getFeeConfigs();
      if (configs.some(c => c.id === config.id)) {
        return false;
      }
      configs.push(config);
      localStorage.setItem(this.FEE_CONFIG_KEY, JSON.stringify(configs));
      return true;
    }
    return false;
  }

  updateFeeConfig(config: FeeConfig): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const configs = this.getFeeConfigs();
      const index = configs.findIndex(c => c.id === config.id);
      if (index === -1) {
        return false;
      }
      configs[index] = config;
      localStorage.setItem(this.FEE_CONFIG_KEY, JSON.stringify(configs));
      return true;
    }
    return false;
  }

  deleteFeeConfig(id: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      let configs = this.getFeeConfigs();
      const initialLength = configs.length;
      configs = configs.filter(c => c.id !== id);
      if (configs.length === initialLength) {
        return false;
      }
      localStorage.setItem(this.FEE_CONFIG_KEY, JSON.stringify(configs));
      return true;
    }
    return false;
  }
}
