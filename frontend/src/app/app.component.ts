import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotWidgetComponent } from './components/chatbot-widget/chatbot-widget.component';
import { TranslatePipe } from './core/pipes/translate.pipe';
import { LanguageService } from './core/services/language.service';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ChatbotWidgetComponent,
    TranslatePipe
  ],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <h1>🏦 {{ 'app.name' | translate }}</h1>
          <span class="tagline">Essential bills & savings</span>
        </div>
        <div class="nav-right">
          <select (change)="changeLanguage($event)" class="language-select">
            <option *ngFor="let lang of languages" [value]="lang.code">
              {{ lang.flag }} {{ lang.name }}
            </option>
          </select>
          <ul class="nav-links">
            <li><a routerLink="/dashboard" routerLinkActive="active">📊 Dashboard</a></li>
            <li><a routerLink="/bills" routerLinkActive="active">💰 Bills</a></li>
            <li><a routerLink="/savings" routerLinkActive="active">💎 Savings</a></li>
            <li><a routerLink="/budget" routerLinkActive="active">📈 Budget</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <app-chatbot-widget></app-chatbot-widget>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #6C1B8C 0%, #8B3A9E 100%);
      color: white;
      padding: 0.8rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }
    .nav-brand h1 {
      font-size: 1.4rem;
      margin: 0;
    }
    .tagline {
      font-size: 0.75rem;
      opacity: 0.8;
      display: block;
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      flex-wrap: wrap;
    }
    .language-select {
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.3);
      background: rgba(255,255,255,0.1);
      color: white;
      cursor: pointer;
      font-size: 13px;
    }
    .language-select option { color: #333; }
    .nav-links {
      list-style: none;
      display: flex;
      gap: 0.8rem;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.4rem 0.9rem;
      border-radius: 8px;
      transition: background 0.3s;
      font-size: 14px;
    }
    .nav-links a:hover { background: rgba(255,255,255,0.2); }
    .nav-links a.active { background: rgba(255,255,255,0.3); }
    .main-content {
      max-width: 1200px;
      margin: 1.5rem auto;
      padding: 0 20px;
    }
    @media (max-width: 768px) {
      .nav-container { flex-direction: column; }
      .nav-right { width: 100%; justify-content: center; flex-wrap: wrap; }
      .nav-links { flex-wrap: wrap; justify-content: center; gap: 0.4rem; }
    }
  `]
})
export class AppComponent implements OnInit {
  languages = [
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'SW', name: 'Swahili', flag: '🇰🇪' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'HA', name: 'Hausa', flag: '🇳🇬' },
    { code: 'ZU', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'AF', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'YO', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'TWI', name: 'Twi', flag: '🇬🇭' }
  ];

  constructor(
    private languageService: LanguageService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const user = this.userService.getMockUser();
    this.languageService.setLanguage(user.preferredLanguage);
  }

  changeLanguage(event: any) {
    this.languageService.setLanguage(event.target.value);
  }
}
