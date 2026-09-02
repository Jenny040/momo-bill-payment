import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  name: string;
  fullName?: string;
  country: string;
  language: string;
  currency: string;
  momoBalance: number;
  phoneNumber?: string;
  preferredLanguage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getMockUser(): User {
    return {
      id: 'demo-user',
      name: 'Thabo',
      fullName: 'Thabo Mokoena',
      country: 'SOUTH_AFRICA',
      language: 'en',
      currency: 'ZAR',
      momoBalance: 2340.00,
      phoneNumber: '+27711234567',
      preferredLanguage: 'en'
    };
  }
}