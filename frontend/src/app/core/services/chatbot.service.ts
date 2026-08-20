import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ChatResponse {
  reply: string;
  intent: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  private base = `${environment.chatbotUrl}/chat`;

  constructor(private http: HttpClient) {}

  send(userId: string, message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.base, { user_id: userId, message });
  }
}
