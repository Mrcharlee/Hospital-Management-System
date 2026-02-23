import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { Staff } from '../../../core/models/staff.model';
import { StaffService } from '../../../core/services/staff.service';

@Component({
  selector: 'app-staff-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AgGridModule
  ],
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit {
  staffList: Staff[] = [];

  columnDefs: ColDef[] = [
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'isAdmin', headerName: 'Admin', flex: 1,
      valueFormatter: params => params.value ? 'Yes' : 'No'
    },
    { field: 'address', headerName: 'Address', flex: 2,
      valueGetter: params => params.data.address ?? params.data.doctorDetails?.address ?? ''
    },
    {
      headerName: 'Actions',
      colId: 'actions',
      cellRenderer: (params: any) => {
        return `
          <button class="btn-view">View</button>
          <button class="btn-edit">Edit</button>
          <button class="btn-delete">Delete</button>
        `;
      },
      flex: 2,
    },
  ];

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff() {
    this.staffService.getAll().subscribe({
      next: data => this.staffList = data,
      error: err => console.error(err)
    });
  }

  
  onCellClicked(event: CellClickedEvent) {
    if (event.colDef.colId !== 'actions') return;
    if (!event.event) return;

    const staffId = event.data.id;
    const target = event.event.target as HTMLElement;

    if (target.classList.contains('btn-view')) this.viewStaff(staffId);
    if (target.classList.contains('btn-edit')) this.editStaff(staffId);
    if (target.classList.contains('btn-delete')) this.deleteStaff(staffId);
  }

  viewStaff(id: string) {
    this.router.navigate(['/staff/view', id]);
  }

  editStaff(id: string) {
    this.router.navigate(['/staff/edit', id]);
  }

  deleteStaff(id: string) {
    if (confirm('Are you sure you want to delete this staff?')) {
      this.staffService.delete(id).subscribe(() => this.loadStaff());
    }
  }

  addStaff() {
    this.router.navigate(['/staff/add']);
  }
}