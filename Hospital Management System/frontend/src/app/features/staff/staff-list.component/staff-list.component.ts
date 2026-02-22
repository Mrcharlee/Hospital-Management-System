import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../core/services/staff.service';
import { Staff } from '../../../core/models/staff.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule], 
  templateUrl: './staff-list.component.html',
})
export class StaffListComponent implements OnInit {
  staffList: Staff[] = [];

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.staffService.getAll().subscribe((data) => (this.staffList = data));
  }

  addStaff(): void {
    this.router.navigate(['/staff/add']);
  }

  editStaff(id: string): void {
    this.router.navigate(['/staff/edit', id]);
  }

  viewStaff(id: string): void {
    this.router.navigate(['/staff/view', id]);
  }

  deleteStaff(id: string): void {
    if (confirm('Are you sure you want to delete this staff?')) {
      this.staffService.delete(id).subscribe(() => this.loadStaff());
    }
  }
}