import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export type Country = 'GHANA' | 'UGANDA' | 'RWANDA' | 'COTE_D_IVOIRE' | 'CAMEROON' | 'NIGERIA' | 'SOUTH_AFRICA';
export type Language = 'EN' | 'FR' | 'SW' | 'TWI' | 'LG' | 'RW' | 'HA' | 'YO' | 'IG' | 'ZU' | 'AF';

export interface User {
  id: number;
  phoneNumber: string;
  fullName: string;
  country: Country;
  preferredLanguage: Language;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getMockUser(): User {
    return {
      id: 1,
      phoneNumber: '+27711234567',
      fullName: 'Thabo',
      country: 'SOUTH_AFRICA',
      preferredLanguage: 'EN'
    };
  }
}
