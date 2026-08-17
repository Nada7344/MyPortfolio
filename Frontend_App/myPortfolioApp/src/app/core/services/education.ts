import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IEducation } from '../models/education.model';
import { environment } from '../../environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/education`;

  getAllEducation() {
    return this._http.get<IEducation[]>(this.apiURL);
  }

  createEducation(data: Partial<IEducation>) {
    return this._http.post<IEducation>(this.apiURL, data);
  }

  updateEducation(id: string, data: Partial<IEducation>) {
    return this._http.put<IEducation>(`${this.apiURL}/${id}`, data);
  }

  deleteEducation(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
