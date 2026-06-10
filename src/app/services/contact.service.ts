import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  name:     string;
  email:    string;
  subject?: string;
  message:  string;
}

export interface ContactResponse {
  message: string;
  id:      string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(`${this.api}/contact`, payload);
  }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/contact`);
  }

  markRead(id: string): Observable<any> {
    return this.http.patch(`${this.api}/contact/${id}/read`, {});
  }
}
