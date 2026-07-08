import { Injectable } from '@angular/core';

export interface StudentData {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  mobileNumber: string;
  email?: string;
  photo?: string;
  course?: string;
  department?: string;
  semesterYear?: string;
  admissionDate?: string;
  guardianName?: string;
  relationship?: string;
  guardianMobile?: string;
  guardianEmail?: string;
  guardianAddress?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  bloodGroup?: string;
  allergies?: string;
  emergencyContact?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Student {
  private readonly STORAGE_KEY = 'hostel_students';

  constructor() {
    this.initMockData();
  }

  private initMockData() {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        const mockStudents: StudentData[] = [
          {
            id: 'STU-2026-001',
            firstName: 'Aarav',
            lastName: 'Sharma',
            gender: 'Male',
            dateOfBirth: '2005-04-12',
            mobileNumber: '+91 98765 12345',
            email: 'aarav.sharma@university.edu',
            course: 'B.Tech',
            department: 'Computer Science & Engineering',
            semesterYear: 'Semester 3',
            admissionDate: '2025-07-15',
            guardianName: 'Rajesh Sharma',
            relationship: 'Father',
            guardianMobile: '+91 98765 54321',
            guardianEmail: 'rajesh.sharma@gmail.com',
            guardianAddress: '123, Shanti Nagar, Sector 4, Jaipur, Rajasthan',
            address: '123, Shanti Nagar, Sector 4',
            city: 'Jaipur',
            state: 'Rajasthan',
            pincode: '302012',
            bloodGroup: 'O+',
            allergies: 'Peanuts',
            emergencyContact: '+91 98765 54321'
          },
          {
            id: 'STU-2026-002',
            firstName: 'Ananya',
            lastName: 'Patel',
            gender: 'Female',
            dateOfBirth: '2006-09-22',
            mobileNumber: '+91 87654 23456',
            email: 'ananya.patel@university.edu',
            course: 'BCA',
            department: 'Computer Applications',
            semesterYear: 'Semester 1',
            admissionDate: '2026-06-10',
            guardianName: 'Meera Patel',
            relationship: 'Mother',
            guardianMobile: '+91 87654 65432',
            guardianEmail: 'meera.patel@yahoo.com',
            guardianAddress: '45, Green Villa, Near Lake Garden, Ahmedabad, Gujarat',
            address: '45, Green Villa, Near Lake Garden',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pincode: '380015',
            bloodGroup: 'A+',
            allergies: 'None',
            emergencyContact: '+91 87654 65432'
          },
          {
            id: 'STU-2026-003',
            firstName: 'Kabir',
            lastName: 'Singh',
            gender: 'Male',
            dateOfBirth: '2004-11-05',
            mobileNumber: '+91 76543 34567',
            email: 'kabir.singh@university.edu',
            course: 'MBA',
            department: 'Business Administration',
            semesterYear: 'Semester 3',
            admissionDate: '2025-08-01',
            guardianName: 'Harpreet Singh',
            relationship: 'Father',
            guardianMobile: '+91 76543 76543',
            guardianEmail: 'hsingh@outlook.com',
            guardianAddress: 'Apartment 702, Skyline Towers, Chandigarh, Punjab',
            address: 'Apartment 702, Skyline Towers',
            city: 'Chandigarh',
            state: 'Punjab',
            pincode: '160017',
            bloodGroup: 'B+',
            allergies: 'Dust, Penicillin',
            emergencyContact: '+91 76543 76543'
          }
        ];
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockStudents));
      }
    }
  }

  getStudents(): StudentData[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  }

  getStudentById(id: string): StudentData | undefined {
    return this.getStudents().find(s => s.id === id);
  }

  addStudent(student: StudentData): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const students = this.getStudents();
      if (students.some(s => s.id === student.id)) {
        return false;
      }
      students.push(student);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
      return true;
    }
    return false;
  }

  updateStudent(student: StudentData): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const students = this.getStudents();
      const index = students.findIndex(s => s.id === student.id);
      if (index === -1) {
        return false;
      }
      students[index] = student;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
      return true;
    }
    return false;
  }

  deleteStudent(id: string): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      let students = this.getStudents();
      const initialLength = students.length;
      students = students.filter(s => s.id !== id);
      if (students.length === initialLength) {
        return false;
      }
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(students));
      return true;
    }
    return false;
  }
}

