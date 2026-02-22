import { Component, OnInit } from '@angular/core';
import { StaffService } from '../../../core/services/staff.service';
import { Staff } from '../../../core/models/staff.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-staff-view',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './staff-view.component.html',
})
export class StaffViewComponent implements OnInit {
  staff!: Staff;

  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.staffService.getById(id).subscribe((data) => (this.staff = data));
  }

  back(): void {
    this.router.navigate(['/staff']);
  }
}