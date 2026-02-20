import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef, ICellRendererParams, ValueFormatterParams } from 'ag-grid-community';
import { Appointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { AppointmentViewComponent } from '../appointment-view/appointment-view.component';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AgGridModule, AppointmentFormComponent, AppointmentViewComponent],
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  rowData: Appointment[] = [];
  selected?: Appointment;
  showForm = false;
  showView = false;
  deleteId: string | null = null;

  columnDefs: ColDef<Appointment>[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'patientId', headerName: 'Patient ID', flex: 1 },
    { 
      field: 'appointmentDate', 
      headerName: 'Date/Time', 
      flex: 1,
      valueFormatter: (params: ValueFormatterParams<Appointment>) =>
        params.value ? new Date(params.value).toLocaleString() : ''
    },
    { 
      field: 'isCancelled', 
      headerName: 'Cancelled', 
      width: 120, 
      valueFormatter: (params: ValueFormatterParams<Appointment>) =>
        params.value ? 'Yes' : 'No'
    },
    {
      headerName: 'Actions',
      width: 260,
      cellRenderer: (params: ICellRendererParams<Appointment>) => `
        <button class="btn btn-info view-btn" data-id="${params.data?.id}">View</button>
        <button class="btn btn-warning edit-btn ms-1" data-id="${params.data?.id}">Edit</button>
        <button class="btn btn-danger delete-btn ms-1" data-id="${params.data?.id}">Cancel</button>
      `
    }
  ];

  constructor(private svc: AppointmentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.svc.getAll().subscribe({
      next: data => this.rowData = data,
      error: err => console.error('Failed to load appointments', err)
    });
  }

  onGridReady(ev: any): void {
    ev.api.addEventListener('cellClicked', (e: any) => {
      const target = e.event?.target as HTMLElement;
      if (!target || !e.data) return;

      const id = e.data.id;
      if (target.classList.contains('view-btn')) this.openView(e.data);
      else if (target.classList.contains('edit-btn')) this.openEdit(e.data);
      else if (target.classList.contains('delete-btn')) this.deleteId = id;
    });
  }

  openAdd(): void { this.selected = undefined; this.showForm = true; }
  openEdit(a: Appointment): void { this.selected = a; this.showForm = true; }
  openView(a: Appointment): void { this.selected = a; this.showView = true; }

  confirmDelete(): void {
    if (!this.deleteId) return;
    this.svc.cancel(this.deleteId).subscribe({
      next: () => { this.deleteId = null; this.load(); },
      error: err => console.error('Cancel failed', err)
    });
  }

  onSaved(): void {
    this.showForm = false;
    this.load();
  }
}