// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { PatientListComponent } from './features/patient/patient-list/patient-list.component'; 
// import other components as needed

export const routes: Routes = [
  { path: 'patients', component: PatientListComponent },
  // Add other routes here
];
