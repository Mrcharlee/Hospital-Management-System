import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../../core/models/appointment.model';

@Component({
  selector: 'app-appointment-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-view.component.html',
})
export class AppointmentViewComponent {
  @Input() appointment!: Appointment;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}