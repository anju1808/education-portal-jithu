import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StudentService } from '../../../core/services/student.service';
import { WebinarService } from '../../../core/services/webinar.service';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  webinars: Webinar[] = [];
  loading = false;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private webinarService: WebinarService,
    private router: Router
  ) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      webinarId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadWebinars();
  }

  loadWebinars(): void {
    this.loading = true;
    this.webinarService.getAllWebinars().subscribe({
      next: (webinars) => {
        this.webinars = webinars;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load webinars.';
        this.loading = false;
        console.error('Error loading webinars:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.submitting = true;
      const studentData = this.studentForm.value;
      
      this.studentService.createStudent(studentData).subscribe({
        next: (createdStudent) => {
          this.submitting = false;
          this.router.navigate(['/students'], { 
            queryParams: { webinarId: createdStudent.webinarId } 
          });
        },
        error: (error) => {
          this.submitting = false;
          this.error = 'Failed to create student. Please try again.';
          console.error('Error creating student:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
