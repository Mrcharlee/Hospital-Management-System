import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../patient.model';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-list.component.html',
})
export class PatientListComponent {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) {
    this.loadPatients();
  }

  loadPatients() {
    this.patientService.getAll().subscribe({
      next: (data) => (this.patients = data),
      error: (err) => console.error(err),
    });
  }
}
