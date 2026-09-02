import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  send(userId: string, message: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(`${this.apiUrl}/chat`, {
      userId,
      message
    }).pipe(
      timeout(5000),
      catchError(() => {
        return of({ reply: this.getLocalResponse(message) });
      })
    );
  }

  private getLocalResponse(message: string): string {
    const lower = message.toLowerCase();

    if (lower.includes('bill') || lower.includes('pay')) {
      return "You have 2 pending bills totalling R 599:\n• Eskom Prepaid: R 500 (due 10 Sep)\n• MTN Data Bundle: R 99 (due 15 Sep)";
    }
    if (lower.includes('saving') || lower.includes('save') || lower.includes('pot')) {
      return "Your savings pots:\n• School Fees 2027: R 3,200 / R 8,000 (40%)\n• Emergency Fund: R 1,800 / R 5,000 (36%)\n• Festive Stokvel: R 1,250 / R 3,000 (42%)";
    }
    if (lower.includes('electricity') || lower.includes('eskom')) {
      return "I can help you top up prepaid electricity. Please enter your Eskom token number and the amount you want to load.";
    }
    if (lower.includes('budget')) {
      return "September 2026 budget snapshot:\n• Total spent: R 6,798 of R 8,350 budget (81%)\n• Entertainment is R 99 over budget\n• Budget health score: 74/100 — Good!";
    }
    if (lower.includes('send') || lower.includes('money')) {
      return "Who would you like to send money to? Enter a South African mobile number (e.g. 071 234 5678).";
    }

    return "I'm here to help! Try asking about:\n• Paying bills\n• Checking savings\n• Budget summary\n• Sending money";
  }
}
