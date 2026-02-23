import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Staff } from '../../../core/models/staff.model';
import { StaffService } from '../../../core/services/staff.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
})
export class StaffFormComponent implements OnInit {
  staffForm!: FormGroup;
  staffId: string | null = null;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.staffId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.staffId;

    this.staffForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      isAdmin: [false],
      address: ['', Validators.required],
    });

    if (this.isEditMode) this.loadStaff();
  }

  loadStaff() {
    this.staffService.getById(this.staffId!).subscribe({
      next: (data: Staff) => this.staffForm.patchValue(data),
      error: err => console.error('Failed to load staff', err),
    });
  }

  submitForm() {
    if (this.staffForm.invalid) return;

    const payload = this.staffForm.value;

    if (this.isEditMode) {
      this.staffService.update(this.staffId!, payload).subscribe({
        next: () => this.router.navigate(['/staff']),
        error: err => console.error('Failed to update staff', err),
      });
    } else {
      this.staffService.add(payload).subscribe({
        next: () => this.router.navigate(['/staff']),
        error: err => console.error('Failed to add staff', err),
      });
    }
  }

  cancel() {
    this.router.navigate(['/staff']);
  }
}