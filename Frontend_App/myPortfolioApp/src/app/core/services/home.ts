import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHome } from '../models/home.model';
import { environment } from '../../environments/environment.ts';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/home`;

  getHome(): Observable<IHome> {
    return this.http.get<IHome>(this.apiUrl);
  }

  updateHome(data: IHome): Observable<IHome> {
    return this.http.put<IHome>(this.apiUrl, data);
  }

  uploadProfileImage(file: File): Observable<IHome> {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.http.put<IHome>(`${this.apiUrl}/upload/profile-image`, formData);
  }

  uploadResume(file: File): Observable<IHome> {
    const formData = new FormData();
    formData.append('resume', file);
    return this.http.put<IHome>(`${this.apiUrl}/upload/resume`, formData);
  }
}
