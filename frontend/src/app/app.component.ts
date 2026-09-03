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
          <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/bills" routerLinkActive="active">Bills</a>
          <a routerLink="/savings" routerLinkActive="active">Savings</a>
          <a routerLink="/budget" routerLinkActive="active">Budget</a>
          <a routerLink="/settings" routerLinkActive="active">Settings</a>
        </nav>

        <div class="header-right">
          <select (change)="changeLanguage($event)" [value]="currentLang">
            <option *ngFor="let lang of languages" [value]="lang.code">{{ lang.flag }} {{ lang.name }}</option>
          </select>
          <div class="user-badge">
            <span class="user-avatar">{{ userInitials }}</span>
            {{ userName }}
          </div>
          <button class="btn-logout" (click)="logout()">Logout</button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <router-outlet></router-outlet>
    </main>

    <app-chatbot-widget *ngIf="isAuthenticated"></app-chatbot-widget>
  `,
  styles: [`
    .momo-header { background: #FFCB05; padding: 12px 24px; position: fixed; top: 0; left: 0; right: 0; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
    .container { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .momo-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
    .momo-logo-icon { width: 36px; height: 36px; background: black; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #FFCB05; font-weight: 800; font-size: 14px; }
    .momo-logo-text { font-size: 20px; font-weight: 700; color: black; }
    .momo-logo-text span { font-weight: 300; }
    .nav-links { display: flex; gap: 4px; list-style: none; flex-wrap: wrap; }
    .nav-links a { padding: 8px 16px; border-radius: 8px; color: black; text-decoration: none; font-size: 14px; font-weight: 500; transition: all 0.3s; }
    .nav-links a:hover { background: rgba(0,0,0,0.08); }
    .nav-links a.active { background: black; color: #FFCB05; }
    .header-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .header-right select { background: rgba(0,0,0,0.08); border: none; padding: 6px 12px; border-radius: 6px; font-size: 13px; cursor: pointer; color: black; font-family: 'Poppins', sans-serif; }
    .user-badge { display: flex; align-items: center; gap: 8px; background: black; color: #FFCB05; padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; }
    .user-avatar { width: 28px; height: 28px; background: #FFCB05; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: black; font-size: 12px; font-weight: 700; }
    .btn-logout { background: rgba(0,0,0,0.08); border: none; padding: 6px 14px; border-radius: 6px; font-size: 13px; cursor: pointer; transition: all 0.3s; font-family: 'Poppins', sans-serif; font-weight: 500; }
    .btn-logout:hover { background: rgba(0,0,0,0.15); }
    .main-content { padding-top: 80px; min-height: 100vh; }
    @media (max-width: 768px) { .nav-links { display: none; } }
  `]
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
      }
    });

    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  changeLanguage(event: any) {
    this.languageService.setLanguage(event.target.value);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
