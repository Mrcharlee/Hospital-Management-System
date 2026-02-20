import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { Patient } from '../../../core/models/patient.model';
import { PatientService } from '../../../core/services/patient.service';
import { PatientFormComponent } from '../patient-form/patient-form.component';
import { PatientViewComponent } from '../patient-view/patient-view.component';


@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, AgGridModule, PatientFormComponent, PatientViewComponent, 

  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'Patient Id', width: 110 },
    { field: 'fullName', headerName: 'Name', flex: 1 },
    { headerName: 'Age', valueGetter: (p: any) => this.calculateAge(p?.data?.dateOfBirth), width: 100 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'phone', headerName: 'Phone', width: 140 },
    { headerName: 'Actions', cellRenderer: (params: any) => `
      <button class="btn btn-sm btn-info view-btn" data-id="${params.data?.id}">View</button>
      <button class="btn btn-sm btn-warning edit-btn ms-1" data-id="${params.data?.id}">Edit</button>
      <button class="btn btn-sm btn-danger delete-btn ms-1" data-id="${params.data?.id}">Delete</button>
    `, width: 260 }
  ];

  rowData: Patient[] = [];
  showForm = false;
  showView = false;
  showConfirm = false;
  selected: Patient | null = null;
  deleteId: string | null = null;

  constructor(private svc: PatientService) {}

  ngOnInit(): void { this.load(); }

  load(): void {
    this.svc.getAll().subscribe({
      next: (r) => this.rowData = r,
      error: (err) => console.error('Failed to load patients', err)
    });
  }

  calculateAge(dob?: string): string | number {
    if (!dob) return '';
    const b = new Date(dob);
    if (isNaN(b.getTime())) return '';
    return new Date(Date.now() - b.getTime()).getUTCFullYear() - 1970;
  }

  onGridReady(ev: any): void {
    ev.api.addEventListener('cellClicked', (e: any) => {
      const target = e.event?.target as HTMLElement;
      if (!target) return;
      const id = e.data?.id;
      if (target.classList.contains('view-btn')) this.openView(e.data);
      else if (target.classList.contains('edit-btn')) this.openEdit(e.data);
      else if (target.classList.contains('delete-btn') && id) this.askDelete(id);
    });
  }

  openAdd(): void { this.selected = null; this.showForm = true; }
  openEdit(p: Patient): void { this.selected = p; this.showForm = true; }
  openView(p: Patient): void { this.selected = p; this.showView = true; }
  askDelete(id: string): void { this.deleteId = id; this.showConfirm = true; }
  confirmDelete(): void {
    if (!this.deleteId) return;
    this.svc.delete(this.deleteId).subscribe({ next: () => { this.showConfirm = false; this.deleteId = null; this.load(); }});
  }
  onSaved(): void { this.showForm = false; this.load(); }
}
