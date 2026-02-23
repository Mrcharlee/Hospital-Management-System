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
    deleteId: string | null | undefined = null;

    columnDefs: ColDef<Appointment>[] = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'patientId', headerName: 'Patient ID', flex: 1 },

      {
        field: 'appointmentDate',
        headerName: 'Date/Time',
        flex: 1,
        valueFormatter: (p: ValueFormatterParams<Appointment>) =>
          p.value ? new Date(p.value).toLocaleString() : ''
      },

      
      {
        headerName: 'Cancelled',
        width: 140,
        cellRenderer: (params: ICellRendererParams<Appointment>) => {
          const cancelled = params.data?.isCancelled === true;
          return `
            <button class="cancel-btn ${cancelled ? 'blue' : 'black'}">
              ${cancelled ? 'Cancelled' : 'Active'}
            </button>
          `;
        }
      },

      {
        headerName: 'Actions',
        width: 260,
        cellRenderer: () => `
          <button class="btn btn-info view-btn">View</button>
          <button class="btn btn-warning edit-btn ms-1">Edit</button>
          <button class="btn btn-danger delete-btn ms-1">Delete</button>
        `
      }
    ];

    constructor(private svc: AppointmentService) {}

    ngOnInit(): void {
      this.load();
    }

    load(): void {
      this.svc.getAll().subscribe(d => this.rowData = d);
    }

    onGridReady(ev: any): void {
      ev.api.addEventListener('cellClicked', (e: any) => {
        const target = e.event?.target as HTMLElement;
        if (!target || !e.data) return;

        const appt = e.data as Appointment;
        const id = appt.id;

        if (target.classList.contains('view-btn')) this.openView(appt);
        else if (target.classList.contains('edit-btn')) this.openEdit(appt);
        else if (target.classList.contains('delete-btn')) this.deleteId = id ?? null;

        
        else if (target.classList.contains('cancel-btn')) {
          if (!id) return;

          const result = confirm('Do you want to cancel this appointment?');

          
          if (!result) {
            appt.isCancelled = false;
            this.rowData = [...this.rowData];
            return;
          }

          e
          this.svc.cancel(id).subscribe(() => {
            appt.isCancelled = true;
            this.rowData = [...this.rowData];
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
        this.rowData = this.rowData.filter(a => a.id !== id);
        this.deleteId = null;
      });
    }

    onSaved(): void {
      this.showForm = false;
      this.load();
    }
  }