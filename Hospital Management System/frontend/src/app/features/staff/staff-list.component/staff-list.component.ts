import { Component, OnInit } from '@angular/core';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
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

  rowData: Staff[] = [];
  selected?: Staff;

  showView = false;
  showForm = false;
  showDeleteModal = false;
  deleteId: string | null = null;

  columnDefs: ColDef<Staff>[] = [
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'phone', headerName: 'Phone', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { 
      field: 'isAdmin', headerName: 'Admin', flex: 1,
      valueFormatter: params => params.value ? 'Yes' : 'No'
    },
    { 
      field: 'address', headerName: 'Address', flex: 2,
      valueGetter: params => params.data?.address ?? params.data?.doctorDetails?.address ?? ''
    },
    {
      headerName: 'Actions',
      colId: 'actions',
      cellRenderer: () => `
        <button class="btn btn-sm btn-primary btn-view">View</button>
        <button class="btn btn-sm btn-warning edit-btn ms-1">Edit</button>
        <button class="btn btn-sm btn-danger delete-btn ms-1">Delete</button>
      `,
      flex: 2
    }
  ];

  constructor(private staffService: StaffService, private router: Router) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff() {
    this.staffService.getAll().subscribe({
      next: data => this.rowData = data,
      error: err => console.error(err)
    });
  }

  onGridReady(ev: any): void {
    ev.api.addEventListener('cellClicked', (e: any) => {
      const target = e.event?.target as HTMLElement;
      if (!target || !e.data) return;

      const staff = e.data as Staff;

      if (target.classList.contains('btn-view')) this.openView(staff);
      else if (target.classList.contains('edit-btn')) this.openEdit(staff);
      else if (target.classList.contains('delete-btn')) this.openDelete(staff);
    });
  }

  // --- Modal Handlers ---
  openView(staff: Staff): void {
    this.selected = staff;
    this.showView = true;
  }

  openEdit(staff: Staff): void {
    this.selected = staff;
    this.showForm = true;
  }

  openDelete(staff: Staff): void {
    this.selected = staff;
    this.deleteId = staff.id;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.deleteId) return;

    this.staffService.delete(this.deleteId).subscribe(() => {
      this.rowData = this.rowData.filter(s => s.id !== this.deleteId);
      this.showDeleteModal = false;
      this.deleteId = null;
    });
  }

  onSaved(): void {
    this.showForm = false;
    this.loadStaff();
  }

  addStaff() {
    this.router.navigate(['/staff/add']);
  }
}