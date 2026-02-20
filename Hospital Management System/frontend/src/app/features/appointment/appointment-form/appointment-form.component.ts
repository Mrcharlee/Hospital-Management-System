import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment?: Appointment;
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: AppointmentService) {
    this.form = this.fb.group({
      patientId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.appointment) {
      this.form.patchValue({
        patientId: this.appointment.patientId,
        appointmentDate: this.appointment.appointmentDate,
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload: Appointment = {
      patientId: this.form.value.patientId,
      appointmentDate: this.form.value.appointmentDate,
      isCancelled: this.appointment?.isCancelled ?? false
    };

    if (this.appointment?.id) {
      this.svc.update(this.appointment.id, payload)
        .subscribe(() => this.saved.emit());
    } else {
      this.svc.book(payload)
        .subscribe(() => this.saved.emit());
    }
  }

  close(): void {
    this.saved.emit();
  }
}
