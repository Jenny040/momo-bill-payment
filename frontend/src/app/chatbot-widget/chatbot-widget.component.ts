import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../core/services/chatbot.service';

interface Message {
  from: 'user' | 'bot';
  text: string;
}

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.component.html',
})
export class ChatbotWidgetComponent {
  open = false;
  draft = '';
  messages: Message[] = [
    { from: 'bot', text: 'Hi! Ask me about your bills or reminders.' },
  ];
  userId = 'demo-user';

  constructor(private chatbotService: ChatbotService) {}

  toggle(): void {
    this.open = !this.open;
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) return;
    this.messages.push({ from: 'user', text });
    this.draft = '';

    this.chatbotService.send(this.userId, text).subscribe({
      next: (res) => this.messages.push({ from: 'bot', text: res.reply }),
      error: () =>
        this.messages.push({ from: 'bot', text: 'Sorry, I could not reach the assistant.' }),
    });
  }
}
