import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'webinars', pathMatch: 'full' },
  {
    path: 'webinars',
    loadChildren: () => import('./features/webinars/webinars.module').then(m => m.WebinarsModule)
  },
  {
    path: 'students',
    loadChildren: () => import('./features/students/students.module').then(m => m.StudentsModule)
  }
];
