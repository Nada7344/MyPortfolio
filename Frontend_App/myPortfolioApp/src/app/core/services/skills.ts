import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISkills } from '../models/skills.model';
import { environment } from '../../environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/skills`;

  getSkills() {
    return this._http.get<ISkills>(this.apiURL);
  }

  updateSkills(data: Partial<ISkills>) {
    return this._http.put<ISkills>(this.apiURL, data);
  }
}
