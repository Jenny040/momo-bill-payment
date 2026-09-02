import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div style="min-height:100vh;background:#F7F7F7;font-family:'Poppins',sans-serif;">

      <!-- Hero Section -->
      <section style="padding-top:96px;padding-bottom:64px;background:#FFCB05;position:relative;overflow:hidden;">
        <!-- Decorative Circles -->
        <div style="position:absolute;top:0;right:0;width:384px;height:384px;background:rgba(0,0,0,0.05);border-radius:50%;transform:translateY(-50%) translateX(33%);pointer-events:none;"></div>
        <div style="position:absolute;bottom:0;left:0;width:256px;height:256px;background:rgba(0,0,0,0.05);border-radius:50%;transform:translateY(50%) translateX(-25%);pointer-events:none;"></div>

        <div style="max-width:1280px;margin:0 auto;padding:0 20px;position:relative;z-index:1;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;">

          <!-- Left Content -->
          <div style="flex:1;min-width:300px;max-width:600px;padding-right:20px;">
            <div style="display:inline-flex;align-items:center;gap:8px;background:black;color:#FFCB05;font-size:12px;font-weight:600;padding:6px 12px;border-radius:9999px;margin-bottom:24px;">
              <span style="display:inline-block;width:6px;height:6px;background:#00A86B;border-radius:50%;animation:pulse 2s infinite;"></span>
              MoMo Mini App Hackathon 2026
            </div>

            <h1 style="font-size:48px;font-weight:700;color:black;line-height:1.2;margin-bottom:24px;">
              Manage bills,<br />
              save for the future,<br />
              <span style="position:relative;">track spending.</span>
            </h1>

            <p style="font-size:18px;color:rgba(0,0,0,0.7);font-weight:500;max-width:500px;line-height:1.6;margin-bottom:32px;">
              MoMo Everyday Essentials is your all-in-one companion for South African households — powered by MTN MoMo, built for real life.
            </p>

            <div style="display:flex;flex-wrap:wrap;gap:12px;">
              <a routerLink="/signup" class="btn-hero-primary">Get Started — It's Free</a>
              <a routerLink="/login" class="btn-hero-secondary">Sign In</a>
            </div>

            <p style="font-size:14px;color:rgba(0,0,0,0.6);margin-top:16px;">No bank account required · Works with any MTN number</p>
          </div>

          <!-- Right Stats Cards -->
          <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:320px;margin-top:24px;">

            <!-- Bills Due This Month -->
            <div style="background:white;border-radius:16px;padding:16px 20px;box-shadow:0 20px 60px rgba(0,0,0,0.1);border:1px solid #E5E5E5;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;color:#666;font-weight:500;">Bills Due This Month</span>
                <span style="display:inline-block;width:8px;height:8px;background:#FF6B35;border-radius:50%;"></span>
              </div>
              <div style="font-size:28px;font-weight:700;color:#1A1A1A;">R 1 840</div>
              <div style="font-size:13px;color:#00A86B;font-weight:500;margin-top:2px;">3 of 5 paid ✓</div>
            </div>

            <!-- Total Saved -->
            <div style="background:black;border-radius:16px;padding:16px 20px;box-shadow:0 20px 60px rgba(0,0,0,0.2);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <span style="font-size:13px;color:#FFCB05;opacity:0.8;font-weight:500;">Total Saved</span>
                <span style="color:#FFCB05;font-size:18px;">🏦</span>
              </div>
              <div style="font-size:28px;font-weight:700;color:#FFCB05;">R 6 250</div>
              <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:2px;">Across 3 savings pots</div>
            </div>

            <!-- Monthly Budget -->
            <div style="background:white;border-radius:16px;padding:16px 20px;box-shadow:0 20px 60px rgba(0,0,0,0.1);border:1px solid #E5E5E5;">
              <div style="font-size:13px;color:#666;font-weight:500;margin-bottom:6px;">Monthly Budget</div>
              <div style="width:100%;background:#E5E5E5;border-radius:9999px;height:6px;margin-bottom:6px;">
                <div style="width:68%;background:#FFCB05;height:6px;border-radius:9999px;"></div>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:13px;">
                <span style="font-weight:600;color:#1A1A1A;">68% used</span>
                <span style="color:#666;">R 3 200 left</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Provider Logos -->
      <section style="background:white;border-bottom:1px solid #E5E5E5;padding:24px 20px;">
        <div style="max-width:1280px;margin:0 auto;">
          <p style="font-size:12px;color:#666;font-weight:500;text-align:center;margin-bottom:16px;text-transform:uppercase;letter-spacing:1px;">
            Pay all your South African providers
          </p>
          <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:16px;">
            <div *ngFor="let provider of providers" style="display:flex;align-items:center;gap:8px;">
              <div style="width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;background:{{ provider.color }};color:{{ provider.dark ? '#000' : '#fff' }};">
                {{ provider.initials }}
              </div>
              <span style="font-size:14px;font-weight:500;color:#1A1A1A;">{{ provider.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section style="padding:64px 20px;max-width:1280px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 style="font-size:30px;font-weight:700;color:#1A1A1A;margin-bottom:12px;">Everything you need, nothing you don't</h2>
          <p style="color:#666;max-width:500px;margin:0 auto;">Designed for South African families managing everyday finances with MTN MoMo.</p>
        </div>

        <div style="display:grid;grid-template-columns:1fr;gap:24px;">
          <div *ngFor="let feature of features" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 style="font-weight:600;color:#1A1A1A;margin-bottom:8px;">{{ feature.title }}</h3>
            <p style="font-size:14px;color:#666;line-height:1.6;">{{ feature.desc }}</p>
          </div>
        </div>
      </section>

      <!-- CTA Banner -->
      <section style="background:black;margin:0 16px 64px;border-radius:24px;max-width:1280px;margin-left:auto;margin-right:auto;overflow:hidden;position:relative;padding:64px 24px;">
        <div style="position:absolute;top:0;right:0;width:320px;height:320px;background:rgba(255,203,5,0.1);border-radius:50%;transform:translateY(-25%) translateX(25%);pointer-events:none;"></div>

        <div style="position:relative;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">🇿🇦</div>
          <h2 style="font-size:30px;font-weight:700;color:white;margin-bottom:16px;">Built for Mzansi</h2>
          <p style="color:rgba(255,255,255,0.6);max-width:500px;margin:0 auto 32px;line-height:1.6;">
            Real Rand amounts. Real South African providers. Designed for the way South African families actually manage money.
          </p>
          <a routerLink="/signup" class="btn-cta">Start Managing Your Money</a>
        </div>
      </section>

      <!-- Footer -->
      <footer style="border-top:1px solid #E5E5E5;padding:32px 20px;">
        <div style="max-width:1280px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:16px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:24px;height:24px;background:#FFCB05;border-radius:50%;display:flex;align-items:center;justify-content:center;color:black;font-weight:700;font-size:10px;">M</div>
            <span style="font-size:14px;font-weight:500;color:#1A1A1A;">MoMo Everyday Essentials</span>
          </div>
          <p style="font-size:12px;color:#666;text-align:center;">
            Built for the MoMo Mini App Hackathon 2026 · Not affiliated with MTN Group Limited
          </p>
        </div>
      </footer>
    </div>

    <style>
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      .btn-hero-primary {
        background: black;
        color: #FFCB05;
        font-weight: 600;
        padding: 16px 32px;
        border-radius: 12px;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        font-family: 'Poppins', sans-serif;
      }
      .btn-hero-primary:hover {
        transform: scale(1.02);
      }

      .btn-hero-secondary {
        background: rgba(255,255,255,0.4);
        color: black;
        font-weight: 600;
        padding: 16px 32px;
        border-radius: 12px;
        text-decoration: none;
        border: 1px solid rgba(0,0,0,0.1);
        display: inline-block;
        transition: all 0.3s;
        backdrop-filter: blur(4px);
        font-family: 'Poppins', sans-serif;
      }
      .btn-hero-secondary:hover {
        background: rgba(255,255,255,0.6);
      }

      .feature-card {
        background: white;
        border-radius: 16px;
        padding: 24px;
        border: 1px solid #E5E5E5;
        transition: all 0.3s;
      }
      .feature-card:hover {
        border-color: #FFCB05;
        box-shadow: 0 8px 30px rgba(0,0,0,0.08);
      }

      .feature-icon {
        width: 48px;
        height: 48px;
        background: #FFCB05;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin-bottom: 16px;
        transition: transform 0.3s;
      }
      .feature-card:hover .feature-icon {
        transform: scale(1.1);
      }

      .btn-cta {
        background: #FFCB05;
        color: black;
        font-weight: 700;
        padding: 16px 40px;
        border-radius: 12px;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s;
        box-shadow: 0 8px 30px rgba(255,203,5,0.2);
        font-family: 'Poppins', sans-serif;
      }
      .btn-cta:hover {
        transform: scale(1.02);
      }

      @media (min-width: 1024px) {
        .hero-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    </style>
  `,
  styles: []
})
export class LandingComponent {
  features = [
    { icon: '📄', title: 'Pay Bills Instantly', desc: 'DSTV, prepaid electricity, water, airtime — pay all your bills in one place with MTN MoMo.' },
    { icon: '🏦', title: 'Savings Pots', desc: 'Create named savings goals — emergencies, school fees, stokvels. Watch your money grow.' },
    { icon: '📊', title: 'Budget Tracking', desc: 'Understand your spending by category. Get insights tailored to South African households.' },
    { icon: '⚡', title: 'Quick Actions', desc: 'Send money, buy airtime, or top up electricity in seconds — no bank account needed.' }
  ];

  providers = [
    { name: 'DSTV', color: '#003580', initials: 'DS', dark: false },
    { name: 'Eskom', color: '#007040', initials: 'ES', dark: false },
    { name: 'City Water', color: '#0077B6', initials: 'CW', dark: false },
    { name: 'MTN Data', color: '#FFCB05', initials: 'MT', dark: true },
    { name: 'Vodacom', color: '#E60028', initials: 'VC', dark: false },
    { name: 'Telkom', color: '#005BAB', initials: 'TK', dark: false }
  ];

  constructor(private languageService: LanguageService) {}

  t(key: string): string {
    return this.languageService.get(key);
  }
}
