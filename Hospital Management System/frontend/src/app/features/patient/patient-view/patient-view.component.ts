import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Patient } from '../../../core/models/patient.model';

@Component({
  selector: 'app-patient-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent {
  @Input() patient: Patient | null = null;
  @Output() closed = new EventEmitter<void>();

  close(): void { this.closed.emit(); }
}
