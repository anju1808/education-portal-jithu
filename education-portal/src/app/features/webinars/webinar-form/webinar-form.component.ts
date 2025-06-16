import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebinarService } from '../../../core/services/webinar.service';

@Component({
  selector: 'app-webinar-form',
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
    MatProgressSpinnerModule
  ],
  templateUrl: './webinar-form.component.html',
  styleUrl: './webinar-form.component.scss'
})
export class WebinarFormComponent implements OnInit {
  webinarForm: FormGroup;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private webinarService: WebinarService,
    private router: Router
  ) {
    this.webinarForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      tutor: ['', [Validators.required, Validators.minLength(2)]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Set default times (next hour and hour after that)
    const now = new Date();
    const startTime = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 2 hours from now
    
    this.webinarForm.patchValue({
      startTime: startTime.toISOString().slice(0, 16), // Format for datetime-local input
      endTime: endTime.toISOString().slice(0, 16)
    });
  }

  onSubmit(): void {
    if (this.webinarForm.valid) {
      this.submitting = true;
      const webinarData = this.webinarForm.value;
      
      this.webinarService.createWebinar(webinarData).subscribe({
        next: (createdWebinar) => {
          this.submitting = false;
          this.router.navigate(['/webinars']);
        },
        error: (error) => {
          this.submitting = false;
          this.error = 'Failed to create webinar. Please try again.';
          console.error('Error creating webinar:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/webinars']);
  }
} 