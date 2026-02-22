import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StaffService } from '../../../core/services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Staff } from '../../../core/models/staff.model';


@Component({
  selector: 'app-staff-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './staff-form.component.html',
})
export class StaffFormComponent implements OnInit {
  staffForm!: FormGroup;

  id!: string;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;

    this.staffForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      isAdmin: [false],
      address: ['', Validators.required],
    });

    if (this.isEdit) {
      this.staffService.getById(this.id).subscribe((data) => {
        this.staffForm.patchValue(data);
      });
    }
  }

  save(): void {
    if (this.staffForm.invalid) return;

    const staffData = this.staffForm.value;
    if (this.isEdit) {
      this.staffService.update(this.id, staffData).subscribe(() => this.router.navigate(['/staff']));
    } else {
      this.staffService.add(staffData).subscribe(() => this.router.navigate(['/staff']));
    }
  }
}