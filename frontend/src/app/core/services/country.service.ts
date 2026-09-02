import { Injectable } from '@angular/core';

export interface CountryProvider {
  id: string;
  name: string;
  type: 'electricity' | 'water' | 'airtime' | 'entertainment' | 'school' | 'other';
  icon: string;
  color: string;
  recurring?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  getProvidersForCountry(countryCode: string): CountryProvider[] {
    const providers: { [key: string]: CountryProvider[] } = {
      'SOUTH_AFRICA': [
        { id: 'dstv-sa', name: 'DSTV Premium', type: 'entertainment', icon: '📺', color: '#1a1a2e', recurring: true },
        { id: 'eskom-sa', name: 'Eskom Prepaid', type: 'electricity', icon: '⚡', color: '#ff6b35' },
        { id: 'cct-water', name: 'City of Cape Town Water', type: 'water', icon: '💧', color: '#0077be' },
        { id: 'mtn-sa', name: 'MTN Data Bundle', type: 'airtime', icon: '📱', color: '#ffcb05' },
        { id: 'vodacom-sa', name: 'Vodacom Airtime', type: 'airtime', icon: '📱', color: '#00a86b' }
      ],
      'NIGERIA': [
        { id: 'dstv-ng', name: 'DSTV', type: 'entertainment', icon: '📺', color: '#1a1a2e' },
        { id: 'ikeja-electric', name: 'Ikeja Electric', type: 'electricity', icon: '⚡', color: '#ff6b35' },
        { id: 'abuja-electric', name: 'Abuja Electricity', type: 'electricity', icon: '⚡', color: '#ff6b35' },
        { id: 'mtn-ng', name: 'MTN Nigeria', type: 'airtime', icon: '📱', color: '#ffcb05' },
        { id: 'glo-ng', name: 'Glo Nigeria', type: 'airtime', icon: '📱', color: '#00a86b' }
      ],
      'GHANA': [
        { id: 'dstv-gh', name: 'DSTV', type: 'entertainment', icon: '📺', color: '#1a1a2e' },
        { id: 'ecg-gh', name: 'ECG Electricity', type: 'electricity', icon: '⚡', color: '#ff6b35' },
        { id: 'ghana-water', name: 'Ghana Water', type: 'water', icon: '💧', color: '#0077be' },
        { id: 'mtn-gh', name: 'MTN Ghana', type: 'airtime', icon: '📱', color: '#ffcb05' }
      ]
    };
    return providers[countryCode] || providers['SOUTH_AFRICA'];
  }

  getCurrencySymbol(countryCode: string): string {
    const symbols: { [key: string]: string } = {
      'SOUTH_AFRICA': 'R',
      'NIGERIA': '₦',
      'GHANA': '₵',
      'UGANDA': 'USh',
      'RWANDA': 'FRw',
      'COTE_D_IVOIRE': 'CFA',
      'CAMEROON': 'CFA'
    };
    return symbols[countryCode] || 'R';
  }
}
