import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChatbotWidgetComponent } from './components/chatbot-widget/chatbot-widget.component';
import { LanguageService } from './core/services/language.service';
import { AuthService, User } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ChatbotWidgetComponent
  ],
  template: `
    <header class="momo-header" *ngIf="isAuthenticated">
      <div class="container">
        <a routerLink="/dashboard" class="momo-logo">
          <div class="momo-logo-icon">M</div>
          <span class="momo-logo-text">MoMo <span>Essentials</span></span>
        </a>

        <nav class="nav-links">
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{ t('nav.home') }}</a>
          <a routerLink="/bills" routerLinkActive="active">{{ t('nav.bills') }}</a>
          <a routerLink="/savings" routerLinkActive="active">{{ t('nav.savings') }}</a>
          <a routerLink="/budget" routerLinkActive="active">{{ t('nav.budget') }}</a>
          <a routerLink="/settings" routerLinkActive="active">{{ t('nav.settings') }}</a>
        </nav>

        <div class="header-right">
          <select (change)="changeLanguage($event)" [value]="currentLang">
            <option *ngFor="let lang of languages" [value]="lang.code">{{ lang.flag }} {{ lang.name }}</option>
          </select>
          <div class="user-badge">
            <span class="user-avatar">{{ userInitials }}</span>
            {{ userName }}
          </div>
          <button class="btn-logout" (click)="logout()">{{ t('auth.logout') }}</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <app-chatbot-widget *ngIf="isAuthenticated"></app-chatbot-widget>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  currentLang = 'en';
  userName = '';
  userInitials = '';
  currentUser: User | null = null;

  languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦' },
    { code: 'af', name: 'Afrikaans', flag: '🇿🇦' },
    { code: 'sw', name: 'Swahili', flag: '🇰🇪' },
    { code: 'fr', name: 'Français', flag: '🇨🇮' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
    { code: 'yo', name: 'Yoruba', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' }
  ];

  constructor(
    private authService: AuthService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to authentication state
    this.authService.isAuthenticated$.subscribe(auth => {
      this.isAuthenticated = auth;
      if (auth) {
        const user = this.authService.getCurrentUser();
        if (user) {
          this.currentUser = user;
          this.userName = user.fullName || 'User';
          this.userInitials = this.userName.split(' ').map(n => n[0]).join('').toUpperCase();
          this.languageService.setLanguage(user.language || 'en');
        }
      } else {
        // Redirect to login if not authenticated and not on landing page
        const currentPath = this.router.url;
        if (currentPath !== '/' && currentPath !== '/login' && currentPath !== '/signup') {
          this.router.navigate(['/login']);
        }
      }
    });

    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  t(key: string): string {
    return this.languageService.get(key);
  }

  changeLanguage(event: any) {
    this.languageService.setLanguage(event.target.value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
