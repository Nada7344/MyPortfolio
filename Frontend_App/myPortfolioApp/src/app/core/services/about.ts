import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAbout } from '../models/about.model';
import { environment } from '../../environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/about`;

  getAbout() {
    return this._http.get<IAbout>(this.apiURL);
  }

  updateAbout(data: IAbout) {
    return this._http.put<IAbout>(this.apiURL, data);
  }
}
