import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Staff } from '../../../core/models/staff.model';
import { StaffService } from '../../../core/services/staff.service';


@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css'],
})
export class StaffViewComponent implements OnInit {
  staff!: Staff;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    const staffId = this.route.snapshot.paramMap.get('id');
    if (staffId) {
      this.staffService.getById(staffId).subscribe({
        next: data => this.staff = data,
        error: err => console.error('Failed to load staff', err),
      });
    }
  }

  back() {
    this.router.navigate(['/staff']);
  }
}