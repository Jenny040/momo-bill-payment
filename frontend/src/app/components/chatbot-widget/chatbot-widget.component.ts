import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button class="chat-toggle" (click)="toggle()" *ngIf="!isOpen">💬</button>
    <div class="chat-window" *ngIf="isOpen">
      <div class="chat-header">
        <span>🤖 MoMo Assistant</span>
        <button (click)="toggle()" class="close-btn">✕</button>
      </div>
      <div class="chat-messages" #messageContainer>
        <div *ngFor="let msg of messages" class="message" [class.user]="msg.from === 'user'" [class.bot]="msg.from === 'bot'">
          <p>{{ msg.text }}</p>
        </div>
        <div *ngIf="isTyping" class="message bot">
          <p class="typing">Typing...</p>
        </div>
      </div>
      <div class="quick-replies">
        <button *ngFor="let reply of quickReplies" (click)="sendQuickReply(reply.action)">{{ reply.label }}</button>
      </div>
      <div class="chat-input">
        <input [(ngModel)]="draft" (keyup.enter)="send()" placeholder="Type a message..." class="message-input">
        <button (click)="send()" class="send-btn">Send</button>
      </div>
    </div>
  `,
  styles: [`
    .chat-toggle {
      position: fixed; bottom: 24px; right: 24px; width: 60px; height: 60px;
      border-radius: 50%; background: #FFCB05; border: none; font-size: 28px;
      cursor: pointer; box-shadow: 0 4px 20px rgba(255,203,5,0.4); z-index: 999;
      transition: transform 0.2s;
    }
    .chat-toggle:hover { transform: scale(1.1); }
    .chat-window {
      position: fixed; bottom: 100px; right: 24px; width: 400px; max-width: calc(100vw - 48px);
      height: 500px; background: white; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.2);
      display: flex; flex-direction: column; z-index: 1000; overflow: hidden;
      animation: slideUp 0.3s ease;
    }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    .chat-header {
      padding: 14px 18px; background: linear-gradient(135deg, #6C1B8C, #8B3A9E);
      color: white; display: flex; justify-content: space-between; align-items: center;
      flex-shrink: 0;
    }
    .close-btn {
      background: rgba(255,255,255,0.2); border: none; color: white;
      width: 30px; height: 30px; border-radius: 50%; cursor: pointer;
      font-size: 18px; transition: background 0.2s;
    }
    .close-btn:hover { background: rgba(255,255,255,0.3); }
    .chat-messages { flex: 1; padding: 16px 18px; overflow-y: auto; background: #F8F9FA; }
    .message { margin-bottom: 12px; }
    .message p { margin: 0; padding: 10px 14px; border-radius: 12px; max-width: 80%; word-wrap: break-word; }
    .message.user p { background: #6C1B8C; color: white; margin-left: auto; }
    .message.bot p { background: white; color: #1A1A1A; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    .typing { animation: pulse 1.5s ease-in-out infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    .quick-replies { padding: 8px 16px; display: flex; gap: 6px; flex-wrap: wrap; border-top: 1px solid #eee; background: white; flex-shrink: 0; }
    .quick-replies button {
      padding: 6px 14px; background: #F0F0F0; border: 1px solid #E8E0EB;
      border-radius: 20px; font-size: 12px; color: #1A1A1A; cursor: pointer;
      transition: all 0.2s; white-space: nowrap;
    }
    .quick-replies button:hover { background: #6C1B8C; color: white; border-color: #6C1B8C; }
    .chat-input { display: flex; padding: 10px 16px; border-top: 1px solid #eee; background: white; gap: 10px; flex-shrink: 0; }
    .message-input { flex: 1; padding: 10px 14px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; outline: none; }
    .message-input:focus { border-color: #6C1B8C; box-shadow: 0 0 0 3px rgba(108, 27, 140, 0.1); }
    .send-btn { padding: 10px 24px; background: #FFCB05; color: #1A1A1A; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
    .send-btn:hover { transform: scale(1.02); }
    @media (max-width: 480px) {
      .chat-window { position: fixed; bottom: 0; right: 0; width: 100%; max-width: 100%; height: 100vh; border-radius: 0; }
      .chat-toggle { bottom: 16px; right: 16px; width: 56px; height: 56px; font-size: 24px; }
    }
  `]
})
export class ChatbotWidgetComponent {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  isOpen = false;
  isTyping = false;
  draft = '';
  userId = '1';

  messages: any[] = [
    { from: 'bot', text: 'Hi Thabo! 👋 I\'m your MoMo assistant. I can help you pay bills, check your savings, or manage your budget. What can I do for you?' }
  ];

  quickReplies = [
    { label: 'Check my bills', action: 'bills' },
    { label: 'View savings', action: 'savings' },
    { label: 'Pay electricity', action: 'electricity' },
    { label: 'Budget summary', action: 'budget' },
    { label: 'Send money', action: 'send' }
  ];

  constructor(private chatbotService: ChatbotService) {}

  toggle(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  send(): void {
    const text = this.draft.trim();
    if (!text) return;

    this.messages.push({ from: 'user', text });
    this.draft = '';
    this.isTyping = true;

    this.chatbotService.send(this.userId, text).subscribe({
      next: (res) => {
        this.isTyping = false;
        this.messages.push({ from: 'bot', text: res.reply });
        this.scrollToBottom();
      },
      error: () => {
        this.isTyping = false;
        this.messages.push({ from: 'bot', text: 'Sorry, I could not reach the assistant. Please try again.' });
        this.scrollToBottom();
      }
    });
  }

  sendQuickReply(action: string): void {
    const quickMessages: any = {
      'bills': 'Check my bills',
      'savings': 'View savings',
      'electricity': 'Pay electricity',
      'budget': 'Budget summary',
      'send': 'Send money'
    };
    this.draft = quickMessages[action] || action;
    this.send();
  }

  private scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
