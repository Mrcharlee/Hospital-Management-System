import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Staff } from '../../../core/models/staff.model';

@Component({
  selector: 'app-staff-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css']
})
export class StaffViewComponent {
  @Input() staff!: Staff;
  @Output() closed = new EventEmitter<void>();
}