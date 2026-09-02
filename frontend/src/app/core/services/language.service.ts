import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Language {
  code: string;
  name: string;
  flag: string;
  googleCode: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇬🇧', googleCode: 'en', country: 'South Africa' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦', googleCode: 'zu', country: 'South Africa' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦', googleCode: 'af', country: 'South Africa' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪', googleCode: 'sw', country: 'Kenya' },
    { code: 'fr', name: 'Français', flag: '🇨🇮', googleCode: 'fr', country: 'Côte d\'Ivoire' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', googleCode: 'ha', country: 'Nigeria' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬', googleCode: 'yo', country: 'Nigeria' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬', googleCode: 'ig', country: 'Nigeria' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭', googleCode: 'tw', country: 'Ghana' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼', googleCode: 'rw', country: 'Rwanda' }
  ];

  translations: { [key: string]: { [key: string]: string } } = {
    'app.name': {
      'en': 'MoMo Everyday Essentials',
      'zu': 'MoMo Izinto Zansuku Zonke',
      'af': 'MoMo Alledaagse Essentials',
      'sw': 'MoMo Muhimu wa Kila Siku',
      'fr': 'MoMo Essentiel Quotidien',
      'ha': 'MoMo Muhimman Kullum',
      'yo': 'MoMo Awon Nkan Pataki Ojoojumọ',
      'ig': 'MoMo Ihe Dị Mkpa Kwa Ụbọchị',
      'tw': 'MoMo Nnwɛma Daa Daa',
      'rw': 'MoMo Ibintu Bya Buri Munsi'
    },
    'nav.home': {
      'en': 'Home',
      'zu': 'Ekhaya',
      'af': 'Tuis',
      'sw': 'Nyumbani',
      'fr': 'Accueil',
      'ha': 'Gida',
      'yo': 'Ile',
      'ig': 'Ụlọ',
      'tw': 'Fie',
      'rw': 'Irugi'
    },
    'nav.bills': {
      'en': 'Bills',
      'zu': 'Izikweletu',
      'af': 'Rekeninge',
      'sw': 'Bili',
      'fr': 'Factures',
      'ha': 'Kuɗaɗe',
      'yo': 'Owo-owo',
      'ig': 'Ụgwọ',
      'tw': 'Kaw',
      'rw': 'Amadeni'
    },
    'nav.savings': {
      'en': 'Savings',
      'zu': 'Ukonga',
      'af': 'Spaar',
      'sw': 'Akiba',
      'fr': 'Épargne',
      'ha': 'Tari',
      'yo': 'Ifowopamọ',
      'ig': 'Nchekwa',
      'tw': 'Akwatia',
      'rw': 'Ubutoni'
    },
    'nav.budget': {
      'en': 'Budget',
      'zu': 'Isabelomali',
      'af': 'Begroting',
      'sw': 'Bajeti',
      'fr': 'Budget',
      'ha': 'Kasafin',
      'yo': 'Isuna',
      'ig': 'Ego mmefu',
      'tw': 'Sikasɛm',
      'rw': 'Ingengo'
    },
    'nav.settings': {
      'en': 'Settings',
      'zu': 'Izilungiselelo',
      'af': 'Instellings',
      'sw': 'Mipangilio',
      'fr': 'Paramètres',
      'ha': 'Saiti',
      'yo': 'Eto',
      'ig': 'Ntọala',
      'tw': 'Nsesa',
      'rw': 'Igenamiteri'
    },
    'auth.signIn': {
      'en': 'Sign In',
      'zu': 'Ngena',
      'af': 'Teken In',
      'sw': 'Ingia',
      'fr': 'Se Connecter',
      'ha': 'Shiga',
      'yo': 'Wọle',
      'ig': 'Banye',
      'tw': 'Kɔ',
      'rw': 'Injira'
    },
    'auth.getStarted': {
      'en': 'Get Started',
      'zu': 'Qala',
      'af': 'Begin',
      'sw': 'Anza',
      'fr': 'Commencer',
      'ha': 'Fara',
      'yo': 'Bẹrẹ',
      'ig': 'Bido',
      'tw': 'Fiti',
      'rw': 'Tangira'
    },
    'auth.logout': {
      'en': 'Logout',
      'zu': 'Phuma',
      'af': 'Teken Uit',
      'sw': 'Toka',
      'fr': 'Déconnexion',
      'ha': 'Fita',
      'yo': 'Jade',
      'ig': 'Pụọ',
      'tw': 'Pue',
      'rw': 'Sohoka'
    },
    'auth.noAccount': {
      'en': 'No bank account required. Works with any MTN number.',
      'zu': 'Akukho mabhange adingekayo. Isebenza nganoma iyiphi inombolo ye-MTN.',
      'af': 'Geen bankrekening nodig. Werk met enige MTN-nommer.',
      'sw': 'Hakuna akaunti ya benki inahitajika. Inafanya kazi na nambari yoyote ya MTN.',
      'fr': 'Aucun compte bancaire requis. Fonctionne avec n\'importe quel numéro MTN.',
      'ha': 'Babu asusin banki da ake buƙata. Yana aiki da kowace lambar MTN.',
      'yo': 'Ko si iṣiro banki ti o nilo. Ṣiṣẹ pẹlu nọmba MTN eyikeyi.',
      'ig': 'Ọ dịghị akaụntụ ụlọ akụ chọrọ. Na-arụ ọrụ na nọmba MTN ọ bụla.',
      'tw': 'Mpo sika banki nhia. Ɛyɛ adwuma ne MTN nɔma biara.',
      'rw': 'Nta ibanki isabwa. Ikora na numero iyo yose ya MTN.'
    },
    'dashboard.welcome': {
      'en': 'Welcome back, {{name}} 👋',
      'zu': 'Sawubona, {{name}} 👋',
      'af': 'Welkom terug, {{name}} 👋',
      'sw': 'Karibu tena, {{name}} 👋',
      'fr': 'Bon retour, {{name}} 👋',
      'ha': 'Barka da dawowa, {{name}} 👋',
      'yo': 'Kaabọ pada, {{name}} 👋',
      'ig': 'Nnọọ ọzọ, {{name}} 👋',
      'tw': 'Akwaaba aba, {{name}} 👋',
      'rw': 'Murakaza neza, {{name}} 👋'
    },
    'dashboard.subtitle': {
      'en': "Here's your financial overview for September 2026",
      'zu': "Nakhu ukubuka kwakho kwezimali zika-September 2026",
      'af': "Hier is jou finansiële oorsig vir September 2026",
      'sw': "Hapa ni muhtasari wako wa kifedha wa Septemba 2026",
      'fr': "Voici votre aperçu financier pour septembre 2026",
      'ha': "Ga takaitaccen bayanin kuɗin ku na Satumba 2026",
      'yo': "Eyi ni akopọ owo rẹ fun Oṣu Kẹsan 2026",
      'ig': "Nke a bụ nchịkọta ego gị maka Septemba 2026",
      'tw': "Eyɛ wo sikasɛm nhwehwɛmu ma September 2026",
      'rw': "Ubu ni urutonde rw'amafaranga yawe muri Nzeri 2026"
    },
    'dashboard.billsDue': {
      'en': 'Bills Due',
      'zu': 'Izikweletu Ezifanele',
      'af': 'Rekeninge Verskuldig',
      'sw': 'Bili Zinazodaiwa',
      'fr': 'Factures à Payer',
      'ha': 'Kuɗaɗen Da Ake Biya',
      'yo': 'Owo-owo Ti O Tọ',
      'ig': 'Ụgwọ Ndị Na-eru',
      'tw': 'Kaw a Wɔbɛtua',
      'rw': 'Amafaranga Yo Kwishyura'
    },
    'dashboard.totalSaved': {
      'en': 'Total Saved',
      'zu': 'Okongiwe Konke',
      'af': 'Totaal Gespaar',
      'sw': 'Jumla ya Akiba',
      'fr': 'Total Épargné',
      'ha': 'Jimlar Tari',
      'yo': 'Lapapọ Ti a Fipamọ',
      'ig': 'Ngụkọta Echekwara',
      'tw': 'Nea Wɔakora',
      'rw': 'Byose Byabitswe'
    },
    'dashboard.overdue': {
      'en': 'Overdue',
      'zu': 'Isewelle',
      'af': 'Agterstallig',
      'sw': 'Imechelewa',
      'fr': 'En Retard',
      'ha': 'An wuce lokaci',
      'yo': 'Ti Pẹ',
      'ig': 'Gafere oge',
      'tw': 'Atwa',
      'rw': 'Yarenze igihe'
    },
    'dashboard.monthlySpend': {
      'en': 'Monthly Spend',
      'zu': 'Ukusetshenziswa Kwanyanga zonke',
      'af': 'Maandelikse Besteding',
      'sw': 'Matumizi ya Mwezi',
      'fr': 'Dépenses Mensuelles',
      'ha': 'Kashewar Wata',
      'yo': 'Inawo Oṣooṣo',
      'ig': 'Mmefu Kwa Ọnwa',
      'tw': 'Sikasɛm Ɔsrane',
      'rw': 'Amafaranga Ya Mukwezi'
    },
    'bills.title': {
      'en': 'Bills',
      'zu': 'Izikweletu',
      'af': 'Rekeninge',
      'sw': 'Bili',
      'fr': 'Factures',
      'ha': 'Kuɗaɗe',
      'yo': 'Owo-owo',
      'ig': 'Ụgwọ',
      'tw': 'Kaw',
      'rw': 'Amadeni'
    },
    'bills.pending': {
      'en': 'Pending',
      'zu': 'Kusalindile',
      'af': 'Hangende',
      'sw': 'Inasubiri',
      'fr': 'En Attente',
      'ha': 'Ana jira',
      'yo': 'Ti Nduro',
      'ig': 'Na-eche',
      'tw': 'Retɔ',
      'rw': 'Bitegereje'
    },
    'bills.paid': {
      'en': 'Paid',
      'zu': 'Ikhokhiwe',
      'af': 'Betaal',
      'sw': 'Imelipiwa',
      'fr': 'Payé',
      'ha': 'An biya',
      'yo': 'Ti San',
      'ig': 'Akwoo',
      'tw': 'Tua',
      'rw': 'Yishyuwe'
    },
    'bills.overdue': {
      'en': 'Overdue',
      'zu': 'Isewelle',
      'af': 'Agterstallig',
      'sw': 'Imechelewa',
      'fr': 'En Retard',
      'ha': 'An wuce lokaci',
      'yo': 'Ti Pẹ',
      'ig': 'Gafere oge',
      'tw': 'Atwa',
      'rw': 'Yarenze igihe'
    },
    'bills.payNow': {
      'en': 'Pay Now',
      'zu': 'Khokha Manje',
      'af': 'Betaal Nou',
      'sw': 'Lipa Sasa',
      'fr': 'Payer Maintenant',
      'ha': 'Biya Yanzu',
      'yo': 'San Bayi',
      'ig': 'Kwu Ugbu a',
      'tw': 'Tua Seesei',
      'rw': 'Kwishyura Nonaha'
    },
    'savings.title': {
      'en': 'Savings',
      'zu': 'Ukonga',
      'af': 'Spaar',
      'sw': 'Akiba',
      'fr': 'Épargne',
      'ha': 'Tari',
      'yo': 'Ifowopamọ',
      'ig': 'Nchekwa',
      'tw': 'Akwatia',
      'rw': 'Ubutoni'
    },
    'budget.title': {
      'en': 'Budget',
      'zu': 'Isabelomali',
      'af': 'Begroting',
      'sw': 'Bajeti',
      'fr': 'Budget',
      'ha': 'Kasafin',
      'yo': 'Isuna',
      'ig': 'Ego mmefu',
      'tw': 'Sikasɛm',
      'rw': 'Ingengo'
    },
    'chatbot.greeting': {
      'en': 'Hi! I\'m your MoMo assistant. How can I help?',
      'zu': 'Sawubona! Ngingumsizi wakho we-MoMo. Ngingakusiza ngani?',
      'af': 'Hallo! Ek is jou MoMo-assistent. Hoe kan ek help?',
      'sw': 'Hujambo! Mimi ni msaidizi wako wa MoMo. Ninaweza kukusaidia vipi?',
      'fr': 'Bonjour ! Je suis votre assistant MoMo. Comment puis-je vous aider ?',
      'ha': 'Sannu! Ni mataimakin ku ne na MoMo. Ta yaya zan taimaka?',
      'yo': 'Kab o! Emi ni oluranlọwọ MoMo rẹ. Bawo ni MO ṣe le ran ọ lọwọ?',
      'ig': 'Ndewo! Abụ m onye enyemaka MoMo gị. Kedu ka m ga-esi nyere gị aka?',
      'tw': 'Akwaaba! Mene wo MoMo boafo. Sɛnea na metumi aboa wo?',
      'rw': 'Muraho! Ndi umufasha wawe wa MoMo. Nigute nshobora kugufasha?'
    },
    'chatbot.bills': {
      'en': 'Check my bills',
      'zu': 'Bheka izikweletu zami',
      'af': 'Kyk my rekeninge',
      'sw': 'Angalia bili zangu',
      'fr': 'Voir mes factures',
      'ha': 'Duba kuɗaɗena',
      'yo': 'Ṣayẹwo owo-owo mi',
      'ig': 'Lelee ụgwọ m',
      'tw': 'Hwɛ me kaw',
      'rw': 'Reba amadeni yanjye'
    },
    'chatbot.savings': {
      'en': 'View savings',
      'zu': 'Buka ukonga',
      'af': 'Bekyk spaar',
      'sw': 'Angalia akiba',
      'fr': 'Voir l\'épargne',
      'ha': 'Duba tari',
      'yo': 'Wo ifowopamọ',
      'ig': 'Lee nchekwa',
      'tw': 'Hwɛ akwatia',
      'rw': 'Reba ubutoni'
    },
    'chatbot.budget': {
      'en': 'Budget summary',
      'zu': 'Isifinyezo sesabelomali',
      'af': 'Begroting opsomming',
      'sw': 'Muhtasari wa bajeti',
      'fr': 'Résumé du budget',
      'ha': 'Takaitaccen kasafin',
      'yo': 'Akopọ isuna',
      'ig': 'Nchịkọta ego mmefu',
      'tw': 'Sikasɛm nkyerɛmu',
      'rw': 'Ingengo y\'ingengo'
    },
    'chatbot.electricity': {
      'en': 'Pay electricity',
      'zu': 'Khokha ugesi',
      'af': 'Betaal elektrisiteit',
      'sw': 'Lipa umeme',
      'fr': 'Payer l\'électricité',
      'ha': 'Biya wutar lantarki',
      'yo': 'San ina',
      'ig': 'Kwụ ụgwọ ọkụ',
      'tw': 'Tua eletrisiti',
      'rw': 'Kwishyura amashanyarazi'
    },
    'chatbot.send': {
      'en': 'Send money',
      'zu': 'Thumela imali',
      'af': 'Stuur geld',
      'sw': 'Tuma pesa',
      'fr': 'Envoyer de l\'argent',
      'ha': 'Aika kuɗi',
      'yo': 'Firanṣẹ owo',
      'ig': 'Ziga ego',
      'tw': 'Soma sika',
      'rw': 'Ohereza amafaranga'
    }
  };

  constructor() {}

  getCurrentLanguage(): string {
    return this.currentLang.value;
  }

  setLanguage(langCode: string) {
    const lang = this.languages.find(l => l.code === langCode);
    if (lang) {
      this.currentLang.next(langCode);
    }
  }

  get(key: string, params?: any): string {
    const lang = this.currentLang.value;
    let value = this.translations[key]?.[lang] || this.translations[key]?.['en'] || key;
    if (params && value) {
      Object.keys(params).forEach(param => {
        value = value.replace(`{{${param}}}`, params[param]);
      });
    }
    return value;
  }

  getLanguageName(code: string): string {
    const lang = this.languages.find(l => l.code === code);
    return lang ? lang.name : code;
  }

  getGoogleCode(langCode: string): string {
    const lang = this.languages.find(l => l.code === langCode);
    return lang ? lang.googleCode : 'en';
  }
}
