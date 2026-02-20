import { Routes } from '@angular/router';
import { PatientListComponent } from './features/patient/patient-list/patient-list.component';
import { PatientFormComponent } from './features/patient/patient-form/patient-form.component';
import { PatientViewComponent } from './features/patient/patient-view/patient-view.component';
import { AppointmentListComponent } from './features/appointment/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './features/appointment/appointment-form/appointment-form.component';
import { AppointmentViewComponent } from './features/appointment/appointment-view/appointment-view.component';


export const routes: Routes = [
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients', component: PatientListComponent },
  { path: 'patients/add', component: PatientFormComponent },
  { path: 'patients/:id/edit', component: PatientFormComponent },
  { path: 'patients/:id/view', component: PatientViewComponent },
  { path: 'appointments', component: AppointmentListComponent } ,
  { path: 'appointments/add', component: AppointmentFormComponent },
  { path: 'appointments/:id/view', component: AppointmentViewComponent }
];
