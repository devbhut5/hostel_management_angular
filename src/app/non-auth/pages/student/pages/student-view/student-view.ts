import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student, StudentData } from '../../services/student';

@Component({
  selector: 'app-student-view',
  imports: [CommonModule, RouterLink],
  templateUrl: './student-view.html',
  styleUrl: './student-view.scss',
})
export class StudentView implements OnInit {
  student: StudentData | undefined;
  studentIdParam: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: Student
  ) {}

  ngOnInit() {
    this.studentIdParam = this.route.snapshot.paramMap.get('id');
    if (this.studentIdParam) {
      this.student = this.studentService.getStudentById(this.studentIdParam);
      if (!this.student) {
        this.router.navigate(['/student']);
      }
    } else {
      this.router.navigate(['/student']);
    }
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName ? firstName.charAt(0) : ''}${lastName ? lastName.charAt(0) : ''}`.toUpperCase();
  }
}

