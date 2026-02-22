import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { PatientListComponent } from './features/patient/patient-list/patient-list.component';
import { PatientFormComponent } from './features/patient/patient-form/patient-form.component';
import { PatientViewComponent } from './features/patient/patient-view/patient-view.component';

import { AppointmentListComponent } from './features/appointment/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './features/appointment/appointment-form/appointment-form.component';
import { AppointmentViewComponent } from './features/appointment/appointment-view/appointment-view.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // Dashboard
      { path: 'dashboard', component: DashboardComponent },

      // Patients
      { path: 'patients', component: PatientListComponent },
      { path: 'patients/add', component: PatientFormComponent },
      { path: 'patients/:id/edit', component: PatientFormComponent },
      { path: 'patients/:id/view', component: PatientViewComponent },

      // Appointments
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/add', component: AppointmentFormComponent },
      { path: 'appointments/:id/edit', component: AppointmentFormComponent },
      { path: 'appointments/:id/view', component: AppointmentViewComponent },

      // Staff (standalone components)
      {
        path: 'staff',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/staff/staff-list.component/staff-list.component').then(
                (m) => m.StaffListComponent
              ),
          },
          {
            path: 'add',
            loadComponent: () =>
              import('./features/staff/staff-form.component/staff-form.component').then(
                (m) => m.StaffFormComponent
              ),
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./features/staff/staff-form.component/staff-form.component').then(
                (m) => m.StaffFormComponent
              ),
          },
          {
            path: 'view/:id',
            loadComponent: () =>
              import('./features/staff/staff-view.component/staff-view.component').then(
                (m) => m.StaffViewComponent
              ),
          },
        ],
      },
    ],
  },
];