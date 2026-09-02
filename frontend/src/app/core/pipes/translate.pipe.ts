import { Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private languageService: LanguageService) {}

  transform(key: string, params?: any): string {
    // This is a simplified version - you can expand with actual translations
    const translations: { [key: string]: string } = {
      'app.name': 'MoMo Everyday Essentials',
      'app.tagline': 'Essential bills & savings',
      'nav.dashboard': 'Dashboard',
      'nav.bills': 'Bills',
      'nav.savings': 'Savings',
      'nav.budget': 'Budget'
    };
    let value = translations[key] || key;
    if (params && value) {
      Object.keys(params).forEach(param => {
        value = value.replace(`{{${param}}}`, params[param]);
      });
    }
    return value;
  }
}