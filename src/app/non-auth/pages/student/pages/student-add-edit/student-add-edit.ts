import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student, StudentData } from '../../services/student';

@Component({
  selector: 'app-student-add-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './student-add-edit.html',
  styleUrl: './student-add-edit.scss',
})
export class StudentAddEdit implements OnInit {
  studentForm!: FormGroup;
  isEditMode: boolean = false;
  studentIdParam: string | null = null;
  photoBase64: string | null = null;
  submitted: boolean = false;

  // Dropdown lists
  genderList = ['Male', 'Female', 'Other'];
  courseList = ['B.Tech', 'M.Tech', 'BCA', 'MCA', 'B.Sc', 'M.Sc', 'MBA', 'BBA'];
  departmentList = [
    'Computer Science & Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Electrical Engineering',
    'Civil Engineering',
    'Business Administration',
    'Computer Applications',
    'Science & Humanities'
  ];
  semesterList = [
    'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4',
    'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8',
    'Year 1', 'Year 2', 'Year 3', 'Year 4'
  ];
  relationshipList = ['Father', 'Mother', 'Guardian', 'Sibling', 'Other'];
  bloodGroupList = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: Student
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  private initForm() {
    this.studentForm = this.fb.group({
      id: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.email]],
      photo: [''],
      
      course: [''],
      department: [''],
      semesterYear: [''],
      admissionDate: [''],
      
      guardianName: [''],
      relationship: [''],
      guardianMobile: [''],
      guardianEmail: ['', [Validators.email]],
      guardianAddress: [''],
      
      address: [''],
      city: [''],
      state: [''],
      pincode: [''],
      
      bloodGroup: [''],
      allergies: [''],
      emergencyContact: ['']
    });
  }

  private checkEditMode() {
    this.studentIdParam = this.route.snapshot.paramMap.get('id');
    if (this.studentIdParam) {
      this.isEditMode = true;
      this.studentForm.get('id')?.disable(); // Can't edit student ID once created
      const studentData = this.studentService.getStudentById(this.studentIdParam);
      if (studentData) {
        this.studentForm.patchValue(studentData);
        if (studentData.photo) {
          this.photoBase64 = studentData.photo;
        }
      } else {
        this.router.navigate(['/student']);
      }
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.photoBase64 = reader.result as string;
        this.studentForm.patchValue({
          photo: this.photoBase64
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto() {
    this.photoBase64 = null;
    this.studentForm.patchValue({
      photo: ''
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    const studentValue = this.studentForm.getRawValue() as StudentData;
    
    let success = false;
    if (this.isEditMode) {
      success = this.studentService.updateStudent(studentValue);
    } else {
      success = this.studentService.addStudent(studentValue);
      if (!success) {
        this.studentForm.get('id')?.setErrors({ duplicateId: true });
        return;
      }
    }

    if (success) {
      this.router.navigate(['/student']);
    }
  }
}

