import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IContact, IContactMessage } from '../../core/models/contact.model';
import { environment } from '../../environments/environment.ts';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _http = inject(HttpClient);
  private apiURL = `${environment.apiUrl}/contact`;

  getContact() {
    return this._http.get<IContact>(this.apiURL);
  }

  updateContact(data: Partial<IContact>) {
    return this._http.put<IContact>(this.apiURL, data);
  }

  sendMessage(data: IContactMessage) {
    return this._http.post<{ message: string }>(`${this.apiURL}/sendEmail`, data);
  }
}
