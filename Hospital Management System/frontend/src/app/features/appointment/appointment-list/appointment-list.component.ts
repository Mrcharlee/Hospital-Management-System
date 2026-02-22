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
  deleteId: string | null | undefined = null; // TS-safe

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
      headerName: 'Cancelled',
      width: 120,
      cellRenderer: (params: ICellRendererParams<Appointment>) => {
        const appt = params.data!;
        const color = appt.isCancelled ? 'black' : 'white';
        return `<div class="cancel-circle" style="background-color: ${color}"></div>`;
      }
    },
    {
      headerName: 'Actions',
      width: 260,
      cellRenderer: (params: ICellRendererParams<Appointment>) => `
        <button class="btn btn-info view-btn">View</button>
        <button class="btn btn-warning edit-btn ms-1">Edit</button>
        <button class="btn btn-danger delete-btn ms-1">Delete</button>
      `
    }
  ];

  constructor(private svc: AppointmentService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.svc.getAll().subscribe(data => this.rowData = data);
  }

  onGridReady(ev: any): void {
    ev.api.addEventListener('cellClicked', (e: any) => {
      const target = e.event?.target as HTMLElement;
      if (!target || !e.data) return;

      const appt = e.data as Appointment;
      const id = appt.id ?? null;

      if (target.classList.contains('view-btn')) this.openView(appt);
      else if (target.classList.contains('edit-btn')) this.openEdit(appt);
      else if (target.classList.contains('delete-btn')) this.deleteId = id;
      else if (target.classList.contains('cancel-circle')) {
        if (appt.isCancelled) return; // already cancelled

        const ok = confirm('Do you want to cancel this appointment?');
        if (!ok) return;

        this.svc.cancel(id!).subscribe(() => {
          const idx = this.rowData.findIndex(a => a.id === id);
          if (idx > -1) {
            this.rowData[idx].isCancelled = true;
            this.rowData = [...this.rowData]; // refresh grid
          }
        });
      }
    });
  }

  openAdd(): void { this.selected = undefined; this.showForm = true; }
  openEdit(a: Appointment): void { this.selected = a; this.showForm = true; }
  openView(a: Appointment): void { this.selected = a; this.showView = true; }

  confirmDelete(): void {
    if (!this.deleteId) return;

    const id = this.deleteId;
    this.svc.cancel(id).subscribe(() => {
      const idx = this.rowData.findIndex(a => a.id === id);
      if (idx > -1) this.rowData[idx].isCancelled = true;
      this.deleteId = null;
      this.rowData = [...this.rowData];
    });
  }

  onSaved(): void { this.showForm = false; this.load(); }
}