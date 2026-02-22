import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff.model';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private apiUrl = `${environment.apiUrl}/staff`; // same pattern as PatientService

  constructor(private http: HttpClient) {}

  getAll(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.apiUrl);
  }

  getById(id: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiUrl}/${id}`);
  }

  add(staff: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.apiUrl, staff);
  }

  update(id: string, payload: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}