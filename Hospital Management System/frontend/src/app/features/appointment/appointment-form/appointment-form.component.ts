import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './appointment-form.component.html',
})
export class AppointmentFormComponent implements OnInit {
  @Input() appointment?: Appointment | null;
  @Output() saved = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private svc: AppointmentService, private toastr: ToastrService) {
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

    const value = this.form.value;

    if (this.appointment?.id) {
      this.svc.update(this.appointment.id, value).subscribe({
        next: () => {
          this.toastr.success('Appointment updated successfully');
          this.saved.emit();
        },
        error: (err) => {
          this.toastr.error('Failed to update appointment');
        }
      });
    } else {
      this.svc.book(value).subscribe({
        next: () => {
          this.toastr.success('Appointment booked successfully');
          this.saved.emit();
        },
        error: (err) => {
          this.toastr.error('Failed to book appointment');
        }
      });
    }
  }

  close(): void {
    this.saved.emit();
  }
}