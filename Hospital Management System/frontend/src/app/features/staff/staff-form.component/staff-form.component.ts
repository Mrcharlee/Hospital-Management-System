import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Staff } from '../../../core/models/staff.model';
import { StaffService } from '../../../core/services/staff.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-staff-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent implements OnInit {
  @Input() staff?: Staff;
  @Output() saved = new EventEmitter<void>();

  staffForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder, private staffService: StaffService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.isEditMode = !!this.staff;

    this.staffForm = this.fb.group({
      fullName: [this.staff?.fullName || '', Validators.required],
      phone: [this.staff?.phone || '', Validators.required],
      role: [this.staff?.role || '', Validators.required],
      isAdmin: [this.staff?.isAdmin || false],
      address: [this.staff?.address || '', Validators.required],
    });
  }

  submitForm() {
    if (this.staffForm.invalid) {
      this.toastr.warning('Please fill all required fields');
      return;
    }

    const formValue = this.staffForm.value;
    const payload: Partial<Staff> = { ...formValue };

    if (this.isEditMode && this.staff?.id) {
      this.staffService.update(this.staff.id, payload as Staff).subscribe({
        next: () => { this.toastr.success('Staff updated successfully'); this.saved.emit(); },
        error: () => this.toastr.error('Failed to update staff')
      });
    } else {
      this.staffService.add(payload as Staff).subscribe({
        next: () => { this.toastr.success('Staff added successfully'); this.saved.emit(); },
        error: () => this.toastr.error('Failed to add staff')
      });
    }
  }
}