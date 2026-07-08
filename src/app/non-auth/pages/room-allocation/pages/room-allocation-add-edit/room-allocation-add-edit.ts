import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoomAllocation, AllocationData, HostelInfo, RoomInfo } from '../../services/room-allocation';
import { Student, StudentData } from '../../../student/services/student';


@Component({
  selector: 'app-room-allocation-add-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './room-allocation-add-edit.html',
  styleUrl: './room-allocation-add-edit.scss',
})
export class RoomAllocationAddEdit implements OnInit {
  allocationForm!: FormGroup;
  isEditMode: boolean = false;
  allocationIdParam: string | null = null;
  submitted: boolean = false;

  // Master lists
  students: StudentData[] = [];
  hostels: HostelInfo[] = [];
  rooms: RoomInfo[] = [];
  filteredRooms: RoomInfo[] = [];

  // Searchable student selection state
  searchStudentQuery: string = '';
  filteredStudents: StudentData[] = [];
  selectedStudent: StudentData | null = null;
  showStudentDropdown: boolean = false;

  // Selected room information (Read-only stats)
  selectedRoomStats: { capacity: number; occupied: number; available: number } | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private allocationService: RoomAllocation,
    private studentService: Student
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadMasterData();
    this.checkEditMode();
  }

  private initForm() {
    this.allocationForm = this.fb.group({
      id: [''],
      studentId: ['', [Validators.required]],
      studentName: [{ value: '', disabled: true }, [Validators.required]],
      course: [{ value: '', disabled: true }],
      hostelId: ['', [Validators.required]],
      roomNumber: ['', [Validators.required]],
      checkInDate: ['', [Validators.required]],
      expectedCheckOutDate: ['', [Validators.required]],
      remarks: [''],
      status: ['Active']
    }, { validators: this.dateLessThanValidator });
  }

  private loadMasterData() {
    this.students = this.studentService.getStudents();
    this.filteredStudents = [...this.students];
    this.hostels = this.allocationService.getHostels();
  }

  private checkEditMode() {
    this.allocationIdParam = this.route.snapshot.paramMap.get('id');
    if (this.allocationIdParam) {
      this.isEditMode = true;
      const allocData = this.allocationService.getAllocationById(this.allocationIdParam);
      if (allocData) {
        this.selectedStudent = this.students.find(s => s.id === allocData.studentId) || null;
        if (this.selectedStudent) {
          this.searchStudentQuery = `${this.selectedStudent.firstName} ${this.selectedStudent.lastName}`;
        }

        // Load rooms for this hostel
        this.onHostelChange(allocData.hostelId, false);

        // Patch values
        this.allocationForm.patchValue({
          id: allocData.id,
          studentId: allocData.studentId,
          studentName: allocData.studentName,
          course: allocData.course,
          hostelId: allocData.hostelId,
          roomNumber: allocData.roomNumber,
          checkInDate: allocData.checkInDate,
          expectedCheckOutDate: allocData.expectedCheckOutDate,
          remarks: allocData.remarks,
          status: allocData.status
        });

        // Load stats for current room
        this.onRoomChange(allocData.roomNumber);
      } else {
        this.router.navigate(['/room-allocation']);
      }
    }
  }

  dateLessThanValidator(group: FormGroup): any {
    const checkIn = group.get('checkInDate')?.value;
    const checkOut = group.get('expectedCheckOutDate')?.value;
    if (checkIn && checkOut && new Date(checkIn) > new Date(checkOut)) {
      group.get('expectedCheckOutDate')?.setErrors({ dateLessThan: true });
      return { dateLessThan: true };
    }
    return null;
  }

  toggleStudentDropdown(show: boolean) {
    setTimeout(() => {
      this.showStudentDropdown = show;
    }, 200);
  }

  filterStudents() {
    const query = this.searchStudentQuery.toLowerCase();
    this.filteredStudents = this.students.filter(s =>
      s.firstName.toLowerCase().includes(query) ||
      s.lastName.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query)
    );
  }

  selectStudent(student: StudentData) {
    this.selectedStudent = student;
    this.searchStudentQuery = `${student.firstName} ${student.lastName}`;
    this.allocationForm.patchValue({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      course: student.course || 'N/A'
    });
    this.showStudentDropdown = false;
  }

  clearStudentSelection() {
    this.selectedStudent = null;
    this.searchStudentQuery = '';
    this.allocationForm.patchValue({
      studentId: '',
      studentName: '',
      course: ''
    });
  }

  onHostelChange(hostelId: string, resetRoom: boolean = true) {
    if (resetRoom) {
      this.allocationForm.patchValue({ roomNumber: '' });
      this.selectedRoomStats = null;
    }

    const allRooms = this.allocationService.getRooms(hostelId);

    this.filteredRooms = allRooms.filter(room => {
      const isAvailable = room.occupied < room.capacity;
      const isCurrentAllocatedRoom = this.isEditMode &&
        this.allocationIdParam &&
        this.allocationForm.get('roomNumber')?.value === room.roomNumber &&
        this.allocationForm.get('hostelId')?.value === room.hostelId;
      return isAvailable || isCurrentAllocatedRoom;
    });
  }

  onRoomChange(roomNumber: string) {
    const hostelId = this.allocationForm.get('hostelId')?.value;
    const rooms = this.allocationService.getRooms(hostelId);
    const room = rooms.find(r => r.roomNumber === roomNumber);
    if (room) {
      this.selectedRoomStats = {
        capacity: room.capacity,
        occupied: room.occupied,
        available: room.capacity - room.occupied
      };
    } else {
      this.selectedRoomStats = null;
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.allocationForm.invalid) {
      this.allocationForm.markAllAsTouched();
      return;
    }

    const rawValue = this.allocationForm.getRawValue();
    const hostel = this.hostels.find(h => h.id === rawValue.hostelId);

    const allocationValue: AllocationData = {
      id: rawValue.id || this.generateAllocationId(),
      studentId: rawValue.studentId,
      studentName: rawValue.studentName,
      course: rawValue.course,
      hostelId: rawValue.hostelId,
      hostelName: hostel ? hostel.name : '',
      roomNumber: rawValue.roomNumber,
      checkInDate: rawValue.checkInDate,
      expectedCheckOutDate: rawValue.expectedCheckOutDate,
      remarks: rawValue.remarks,
      status: rawValue.status
    };

    let success = false;
    if (this.isEditMode) {
      success = this.allocationService.updateAllocation(allocationValue);
    } else {
      success = this.allocationService.addAllocation(allocationValue);
    }

    if (success) {
      this.router.navigate(['/room-allocation']);
    }
  }

  private generateAllocationId(): string {
    const allocations = this.allocationService.getAllocations();
    if (allocations.length === 0) return 'ALC-001';

    const ids = allocations.map(a => {
      const match = a.id.match(/\d+/);
      return match ? parseInt(match[0], 10) : 0;
    });
    const nextNum = Math.max(...ids) + 1;
    return `ALC-${nextNum.toString().padStart(3, '0')}`;
  }
}

