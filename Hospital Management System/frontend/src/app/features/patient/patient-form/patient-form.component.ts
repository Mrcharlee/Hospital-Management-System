import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../core/services/patient.service';
import { Patient } from '../../../core/models/patient.model';

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

  constructor(private fb: FormBuilder, private svc: PatientService) {
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
    if (this.form.invalid) return;
    const data: Patient = this.form.value;

    if (this.patient?.id) {
      this.svc.update(this.patient.id, data).subscribe(() => this.saved.emit());
    } else {
      this.svc.add(data).subscribe(() => this.saved.emit());
    }
  }

  cancel(): void {
    this.saved.emit();
  }
}
