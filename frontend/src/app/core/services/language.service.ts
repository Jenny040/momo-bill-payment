import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Translation {
  [key: string]: string | Translation;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('EN');
  currentLang$ = this.currentLang.asObservable();

  private translations: Translation = {};

  languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'SW', name: 'Swahili', flag: '🇰🇪' },
    { code: 'HA', name: 'Hausa', flag: '🇳🇬' },
    { code: 'YO', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'IG', name: 'Igbo', flag: '🇳🇬' },
    { code: 'ZU', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'AF', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'TWI', name: 'Twi (Akan)', flag: '🇬🇭' },
    { code: 'LG', name: 'Luganda', flag: '🇺🇬' },
    { code: 'RW', name: 'Kinyarwanda', flag: '🇷🇼' }
  ];

  constructor() {
    this.loadTranslations('EN');
  }

  setLanguage(lang: string) {
    this.currentLang.next(lang);
    this.loadTranslations(lang);
  }

  private loadTranslations(lang: string) {
    this.translations = this.getMockTranslations(lang);
  }

  get(key: string, params?: any): string {
    let value = key.split('.').reduce((obj, k) => obj?.[k], this.translations) as string;
    if (params) {
      Object.keys(params).forEach(param => {
        value = value?.replace(`{{${param}}}`, params[param]);
      });
    }
    return value || key;
  }

  private getMockTranslations(lang: string): Translation {
    const translations: { [key: string]: Translation } = {
      'EN': {
        'app': { 'name': 'MoMo Everyday Essentials' },
        'dashboard': {
          'title': 'Good morning, {{name}} 👋',
          'subtitle': 'Here\'s your financial overview for {{month}} {{year}}',
          'billsDue': 'Bills Due',
          'totalSaved': 'Total Saved',
          'overdue': 'Overdue',
          'monthlySpend': 'Monthly Spend',
          'quickActions': 'Quick Actions',
          'recentActivity': 'Recent Activity'
        },
        'bills': {
          'title': 'Bills & Payments',
          'pending': 'Pending',
          'paid': 'Paid',
          'overdue': 'Overdue',
          'payNow': 'Pay Now',
          'addBill': 'Add New Bill'
        },
        'savings': {
          'title': 'Savings Pots',
          'create': 'Create Savings Pot',
          'contribute': 'Contribute',
          'totalSaved': 'Total Saved',
          'progress': 'Progress',
          'groupSavings': 'Group Savings'
        },
        'budget': {
          'title': 'Budget & Spending',
          'spent': 'Spent',
          'remaining': 'Remaining',
          'health': 'Budget Health',
          'insights': 'Spending Insights'
        },
        'chatbot': {
          'greeting': 'Hi! I\'m your MoMo assistant. How can I help?',
          'bills': 'Check my bills',
          'savings': 'View savings',
          'budget': 'Budget summary',
          'electricity': 'Pay electricity',
          'send': 'Send money'
        },
        'common': {
          'loading': 'Loading...',
          'error': 'Something went wrong'
        }
      },
      'SW': {
        'app': { 'name': 'MoMo Muhimu wa Kila Siku' },
        'dashboard': {
          'title': 'Habari za asubuhi, {{name}} 👋',
          'subtitle': 'Muhtasari wako wa kifedha kwa {{month}} {{year}}'
        },
        'bills': {
          'title': 'Bili na Malipo',
          'pending': 'Inasubiri',
          'paid': 'Imelipiwa',
          'overdue': 'Imechelewa',
          'payNow': 'Lipa Sasa'
        },
        'savings': {
          'title': 'Akiba',
          'create': 'Unda Akiba',
          'contribute': 'Changia',
          'totalSaved': 'Jumla ya Akiba',
          'progress': 'Maendeleo'
        },
        'budget': {
          'title': 'Bajeti na Matumizi',
          'spent': 'Imetumika',
          'remaining': 'Iliyobaki',
          'health': 'Afya ya Bajeti'
        },
        'chatbot': {
          'greeting': 'Hujambo! Mimi ni msaidizi wako wa MoMo.'
        }
      },
      'FR': {
        'app': { 'name': 'MoMo Essentiel Quotidien' },
        'dashboard': {
          'title': 'Bonjour, {{name}} 👋',
          'subtitle': 'Votre aperçu financier pour {{month}} {{year}}'
        },
        'bills': {
          'title': 'Factures et Paiements',
          'pending': 'En attente',
          'paid': 'Payé',
          'overdue': 'En retard',
          'payNow': 'Payer Maintenant'
        },
        'savings': {
          'title': 'Coffres d\'Épargne',
          'create': 'Créer un Coffre',
          'contribute': 'Contribuer',
          'totalSaved': 'Total Épargné',
          'progress': 'Progrès'
        },
        'budget': {
          'title': 'Budget et Dépenses',
          'spent': 'Dépensé',
          'remaining': 'Restant',
          'health': 'Santé du Budget'
        },
        'chatbot': {
          'greeting': 'Bonjour ! Je suis votre assistant MoMo.'
        }
      }
    };
    return translations[lang] || translations['EN'];
  }
}
