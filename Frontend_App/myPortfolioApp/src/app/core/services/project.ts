import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProject } from '../models/project.model';
import { environment } from '../../environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class ProjectDashboardService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/projects`;

  getAllProjects() {
    return this._http.get<IProject[]>(this.apiURL);
  }

  getProjectById(id: string) {
    return this._http.get<IProject>(`${this.apiURL}/${id}`);
  }

  createProject(data: Partial<IProject>) {
    return this._http.post<IProject>(this.apiURL, data);
  }

  updateProject(id: string, data: Partial<IProject>) {
    return this._http.put<IProject>(`${this.apiURL}/${id}`, data);
  }

  deleteProject(id: string) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}
