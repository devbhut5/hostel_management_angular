import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student, StudentData } from '../../services/student';

@Component({
  selector: 'app-student-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  students: StudentData[] = [];
  filteredStudents: StudentData[] = [];

  // Filter properties
  searchQuery: string = '';
  selectedCourse: string = '';
  selectedGender: string = '';

  // Delete modal state
  showDeleteModal: boolean = false;
  studentToDelete: StudentData | null = null;

  constructor(private studentService: Student) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.students = this.studentService.getStudents();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch = !this.searchQuery ? true : (
        student.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        student.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (student.email && student.email.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
        student.mobileNumber.includes(this.searchQuery)
      );

      const matchesCourse = !this.selectedCourse ? true : student.course === this.selectedCourse;
      const matchesGender = !this.selectedGender ? true : student.gender === this.selectedGender;

      return matchesSearch && matchesCourse && matchesGender;
    });
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCourse = '';
    this.selectedGender = '';
    this.applyFilters();
  }

  openDeleteModal(student: StudentData, event: Event) {
    event.stopPropagation();
    this.studentToDelete = student;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.studentToDelete = null;
    this.showDeleteModal = false;
  }

  confirmDelete() {
    if (this.studentToDelete) {
      this.studentService.deleteStudent(this.studentToDelete.id);
      this.loadStudents();
      this.closeDeleteModal();
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName ? firstName.charAt(0) : ''}${lastName ? lastName.charAt(0) : ''}`.toUpperCase();
  }
}

