import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentService } from '../../../core/services/student.service';
import { WebinarService } from '../../../core/services/webinar.service';
import { Student, Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  webinars: Webinar[] = [];
  loading = true;
  error = '';
  selectedWebinarId: string = '';

  constructor(
    private studentService: StudentService,
    private webinarService: WebinarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.selectedWebinarId = params['webinarId'] || '';
      this.loadData();
    });
  }

  loadData(): void {
    this.loading = true;
    
    // Load webinars first
    this.webinarService.getAllWebinars().subscribe({
      next: (webinars) => {
        this.webinars = webinars;
        this.loadStudents();
      },
      error: (error) => {
        this.error = 'Failed to load webinars.';
        this.loading = false;
        console.error('Error loading webinars:', error);
      }
    });
  }

  loadStudents(): void {
    if (this.selectedWebinarId) {
      // Load students for specific webinar
      this.studentService.getStudentsByWebinar(this.selectedWebinarId).subscribe({
        next: (students) => {
          this.students = students;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load students.';
          this.loading = false;
          console.error('Error loading students:', error);
        }
      });
    } else {
      // Load all students (we'll need to modify the service for this)
      this.loading = false;
      this.students = [];
    }
  }

  onWebinarChange(webinarId: string): void {
    this.selectedWebinarId = webinarId;
    this.loadStudents();
  }

  getWebinarTitle(webinarId: string): string {
    const webinar = this.webinars.find(w => w.id === webinarId);
    return webinar ? webinar.title : 'Unknown Webinar';
  }
}
