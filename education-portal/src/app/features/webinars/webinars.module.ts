import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WebinarListComponent } from './webinar-list/webinar-list.component';
import { WebinarDetailComponent } from './webinar-detail/webinar-detail.component';
import { WebinarFormComponent } from './webinar-form/webinar-form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: WebinarListComponent },
  { path: 'new', component: WebinarFormComponent },
  { path: ':id', component: WebinarDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    WebinarListComponent,
    WebinarDetailComponent,
    WebinarFormComponent
  ]
})
export class WebinarsModule { }
