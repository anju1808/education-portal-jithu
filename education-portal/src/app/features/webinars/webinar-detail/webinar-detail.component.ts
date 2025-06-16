import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WebinarService } from '../../../core/services/webinar.service';
import { Webinar } from '../../../core/models/webinar.model';

@Component({
  selector: 'app-webinar-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './webinar-detail.component.html',
  styleUrl: './webinar-detail.component.scss'
})
export class WebinarDetailComponent implements OnInit {
  webinar: Webinar | null = null;
  loading = true;
  error = '';

  constructor(
    private webinarService: WebinarService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const webinarId = params['id'];
      if (webinarId) {
        this.loadWebinar(webinarId);
      } else {
        this.error = 'Webinar ID not found';
        this.loading = false;
      }
    });
  }

  loadWebinar(webinarId: string): void {
    this.loading = true;
    this.webinarService.getWebinarById(webinarId).subscribe({
      next: (webinar) => {
        this.webinar = webinar;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load webinar details. Please try again.';
        this.loading = false;
        console.error('Error loading webinar:', error);
      }
    });
  }

  formatDateTime(dateTimeString: string): string {
    return new Date(dateTimeString).toLocaleString();
  }

  onBackToList(): void {
    this.router.navigate(['/webinars']);
  }

  onViewStudents(): void {
    if (this.webinar) {
      this.router.navigate(['/students'], { 
        queryParams: { webinarId: this.webinar.id } 
      });
    }
  }
}
