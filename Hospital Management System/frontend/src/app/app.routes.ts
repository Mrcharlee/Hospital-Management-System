import { Routes } from '@angular/router';

import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Patients
import { PatientListComponent } from './features/patient/patient-list/patient-list.component';
import { PatientFormComponent } from './features/patient/patient-form/patient-form.component';
import { PatientViewComponent } from './features/patient/patient-view/patient-view.component';

// Appointments
import { AppointmentListComponent } from './features/appointment/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './features/appointment/appointment-form/appointment-form.component';
import { AppointmentViewComponent } from './features/appointment/appointment-view/appointment-view.component';

// Staff
import { StaffListComponent } from './features/staff/staff-list.component/staff-list.component';
import { StaffFormComponent } from './features/staff/staff-form.component/staff-form.component';
import { StaffViewComponent } from './features/staff/staff-view.component/staff-view.component';

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

      // Staff
      { path: 'staff', component: StaffListComponent },
      { path: 'staff/add', component: StaffFormComponent },
      { path: 'staff/:id/edit', component: StaffFormComponent },
      { path: 'staff/:id/view', component: StaffViewComponent },
      
    ],
  },
];