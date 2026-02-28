import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Staff } from '../../../core/models/staff.model';
import { StaffService } from '../../../core/services/staff.service';
import { ToastrService } from 'ngx-toastr'; 

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
    private route: ActivatedRoute,
    private toastr: ToastrService
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
      next: (data: Staff) => {
        this.staffForm.patchValue(data);
        this.toastr.success('Staff loaded successfully'); 
      },
      error: err => this.toastr.error('Failed to load staff') 
    });
  }

  submitForm() {
    if (this.staffForm.invalid) {
      this.toastr.warning('Please fill all required fields'); 
      return;
    }

    const payload = this.staffForm.value;

    if (this.isEditMode) {
      this.staffService.update(this.staffId!, payload).subscribe({
        next: () => {
          this.toastr.success('Staff updated successfully'); 
          this.router.navigate(['/staff']);
        },
        error: err => this.toastr.error('Failed to update staff') 
      });
    } else {
      this.staffService.add(payload).subscribe({
        next: () => {
          this.toastr.success('Staff added successfully'); 
          this.router.navigate(['/staff']);
        },
        error: err => this.toastr.error('Failed to add staff') 
      });
    }
  }

  cancel() {
    this.toastr.info('Staff form cancelled'); 
    this.router.navigate(['/staff']);
  }
}