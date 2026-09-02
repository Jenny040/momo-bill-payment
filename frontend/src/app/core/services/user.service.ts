import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

<<<<<<< HEAD
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
=======
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
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  getUser(userId: string): Observable<User> {
=======
  getUser(userId: number): Observable<User> {
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getMockUser(): User {
    return {
<<<<<<< HEAD
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
=======
      id: 1,
      phoneNumber: '+27711234567',
      fullName: 'Thabo',
      country: 'SOUTH_AFRICA',
      preferredLanguage: 'EN'
    };
  }
}
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
