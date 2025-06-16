import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebinarService } from '../../../core/services/webinar.service';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-webinar-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './webinar-list.component.html',
  styleUrl: './webinar-list.component.scss'
})
export class WebinarListComponent implements OnInit {
  webinars: Webinar[] = [];
  loading = true;
  error = '';

  constructor(private webinarService: WebinarService) {}

  ngOnInit(): void {
    this.loadWebinars();
  }

  loadWebinars(): void {
    this.loading = true;
    this.webinarService.getAllWebinars().subscribe({
      next: (data) => {
        this.webinars = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load webinars. Please try again.';
        this.loading = false;
        console.error('Error loading webinars:', error);
      }
    });
  }

  formatDateTime(dateTimeString: string): string {
    return new Date(dateTimeString).toLocaleString();
  }
}
