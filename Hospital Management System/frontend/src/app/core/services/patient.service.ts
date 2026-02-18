import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../features/patient/patient.model';
import { environment} from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  create(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.apiUrl, patient);
  }

  update(id: string, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}