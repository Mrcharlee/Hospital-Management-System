import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent {
  @Input() patient: Patient | null = null;
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private svc: PatientService,
    private toastr: ToastrService  // <-- Toastr injected
  ) {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', Validators.required],
      address: [''],
      bloodGroup: ['']
    });
  }

  ngOnChanges(): void {
    if (this.patient) this.form.patchValue(this.patient);
  }

  submit(): void {
    if (this.form.invalid) {
      this.toastr.warning('Please fill all required fields'); // Optional warning
      return;
    }

    const data: Patient = this.form.value;

    if (this.patient?.id) {
      // Update patient
      this.svc.update(this.patient.id, data).subscribe({
        next: () => {
          this.toastr.success('Patient updated successfully');
          this.saved.emit();
        },
        error: () => {
          this.toastr.error('Failed to update patient');
        }
      });
    } else {
      // Add new patient
      this.svc.add(data).subscribe({
        next: () => {
          this.toastr.success('Patient added successfully');
          this.saved.emit();
          this.form.reset(); // optional, clears form after add
        },
        error: () => {
          this.toastr.error('Failed to add patient');
        }
      });
    }
  }

  cancel(): void {
    this.toastr.info('Patient form canceled');
    this.saved.emit();
  }
}