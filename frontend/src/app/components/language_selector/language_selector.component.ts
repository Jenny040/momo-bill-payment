import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService, Language } from '../../core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="language-selector">
      <select [(ngModel)]="selectedLanguage" (change)="changeLanguage()" class="language-select">
        <option *ngFor="let lang of languages" [value]="lang.code">
          {{ lang.flag }} {{ lang.name }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .language-selector {
      display: inline-block;
    }
    .language-select {
      padding: 6px 12px;
      border-radius: 6px;
      border: 1px solid rgba(255,255,255,0.3);
      background: rgba(255,255,255,0.1);
      color: white;
      cursor: pointer;
      font-size: 13px;
      min-width: 120px;
    }
    .language-select option {
      color: #333;
    }
  `]
})
export class LanguageSelectorComponent implements OnInit {
  languages: Language[] = [];
  selectedLanguage: string = 'en';

  constructor(private languageService: LanguageService) {
    this.languages = this.languageService.languages;
  }

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  changeLanguage() {
    this.languageService.setLanguage(this.selectedLanguage);
  }
}