import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <button *ngIf="!isOpen" (click)="toggle()" class="chat-toggle">💬</button>

    <div *ngIf="isOpen" style="position:fixed;bottom:100px;right:24px;width:400px;max-width:calc(100vw - 48px);height:550px;background:white;border-radius:20px;box-shadow:0 20px 80px rgba(0,0,0,0.2);display:flex;flex-direction:column;z-index:1000;overflow:hidden;animation:slideUp 0.3s ease;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#FFCB05,#FFD633);padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
        <div>
          <span style="font-weight:700;color:black;font-size:16px;">🤖 MoMo Assistant</span>
          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(0,0,0,0.6);">
            <span style="display:inline-block;width:8px;height:8px;background:#00A86B;border-radius:50%;animation:pulse 2s infinite;"></span>
            Online • {{ currentTime | date:'shortTime' }}
          </div>
        </div>
        <button (click)="toggle()" class="chat-close-btn">✕</button>
      </div>

      <!-- Messages -->
      <div style="flex:1;overflow-y:auto;padding:16px 20px;background:#F7F7F7;" #messageContainer>
        <div *ngFor="let msg of messages" style="display:flex;margin-bottom:12px;{{ msg.role === 'user' ? 'justify-content:flex-end;' : '' }}">
          <div *ngIf="msg.role === 'bot'" style="width:32px;height:32px;background:#FFCB05;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:black;margin-right:10px;flex-shrink:0;">M</div>
          <div style="max-width:75%;">
            <div style="padding:10px 14px;border-radius:12px;white-space:pre-wrap;word-wrap:break-word;{{ msg.role === 'user' ? 'background:#FFCB05;color:black;border-bottom-right-radius:4px;' : 'background:white;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.06);' }}">
              {{ msg.text }}
            </div>
            <div style="font-size:11px;color:#999;margin-top:4px;{{ msg.role === 'user' ? 'text-align:right;' : '' }}">{{ msg.time }}</div>
          </div>
        </div>
        <div *ngIf="isTyping" style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:32px;height:32px;background:#FFCB05;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:black;">M</div>
          <div style="background:white;padding:12px 16px;border-radius:12px;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.06);display:flex;gap:4px;">
            <span style="width:8px;height:8px;background:#999;border-radius:50%;animation:bounce 1.4s infinite;animation-delay:0ms;"></span>
            <span style="width:8px;height:8px;background:#999;border-radius:50%;animation:bounce 1.4s infinite;animation-delay:200ms;"></span>
            <span style="width:8px;height:8px;background:#999;border-radius:50%;animation:bounce 1.4s infinite;animation-delay:400ms;"></span>
          </div>
        </div>
        <div #messagesEnd></div>
      </div>

      <!-- Quick Replies -->
      <div style="padding:8px 16px;background:white;border-top:1px solid #E5E5E5;display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0;">
        <button *ngFor="let reply of quickReplies" (click)="sendQuickReply(reply)" class="quick-reply-btn">{{ getQuickReplyText(reply) }}</button>
      </div>

      <!-- Input -->
      <div style="padding:10px 16px;background:white;border-top:1px solid #E5E5E5;display:flex;gap:10px;flex-shrink:0;">
        <input [(ngModel)]="inputText" (keyup.enter)="sendMessage()" placeholder="Type a message…" class="chat-input-field">
        <button (click)="sendMessage()" [disabled]="!inputText.trim()" class="chat-send-btn" [style.opacity]="!inputText.trim() ? '0.5' : '1'">Send</button>
      </div>
    </div>

    <style>
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .chat-close-btn {
        background: rgba(0,0,0,0.1);
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 18px;
        transition: all 0.3s;
      }
      .chat-close-btn:hover {
        background: rgba(0,0,0,0.2);
      }
      .quick-reply-btn {
        background: #F7F7F7;
        border: 1px solid #E5E5E5;
        border-radius: 20px;
        padding: 4px 14px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s;
        white-space: nowrap;
        font-family: 'Poppins', sans-serif;
      }
      .quick-reply-btn:hover {
        background: #FFCB05;
        border-color: #FFCB05;
        transform: scale(1.05);
      }
      .chat-input-field {
        flex: 1;
        padding: 10px 16px;
        border: 1px solid #E5E5E5;
        border-radius: 10px;
        font-size: 14px;
        outline: none;
        font-family: 'Poppins', sans-serif;
        transition: border-color 0.3s;
      }
      .chat-input-field:focus {
        border-color: #FFCB05;
      }
      .chat-send-btn {
        padding: 10px 20px;
        background: #FFCB05;
        color: black;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        font-family: 'Poppins', sans-serif;
      }
      .chat-send-btn:hover:not(:disabled) {
        transform: scale(1.05);
      }
      .chat-send-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    </style>
  `,
  styles: []
})
export class ChatbotWidgetComponent implements OnInit, OnDestroy {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  isOpen = false;
  isTyping = false;
  inputText = '';
  messages: any[] = [];
  quickReplies = ['bills', 'savings', 'electricity', 'budget', 'send'];
  currentTime = new Date();
  private timeSubscription: any;

  constructor(
    private chatbotService: ChatbotService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    const greeting = this.languageService.get('chatbot.greeting') || 'Hi Thabo! 👋 I\'m your MoMo assistant. How can I help?';
    this.messages = [{
      role: 'bot',
      text: greeting,
      time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    }];

    this.timeSubscription = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timeSubscription) {
      clearInterval(this.timeSubscription);
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) setTimeout(() => this.scrollToBottom(), 100);
  }

  getQuickReplyText(key: string): string {
    const map: any = {
      'bills': this.languageService.get('chatbot.bills') || 'Check my bills',
      'savings': this.languageService.get('chatbot.savings') || 'View savings',
      'electricity': this.languageService.get('chatbot.electricity') || 'Pay electricity',
      'budget': this.languageService.get('chatbot.budget') || 'Budget summary',
      'send': this.languageService.get('chatbot.send') || 'Send money'
    };
    return map[key] || key;
  }

  sendMessage() {
    const text = this.inputText.trim();
    if (!text) return;

    this.messages.push({
      role: 'user',
      text: text,
      time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    });
    this.inputText = '';
    this.isTyping = true;
    this.scrollToBottom();

    this.chatbotService.send('demo-user', text).subscribe({
      next: (res) => {
        this.isTyping = false;
        this.messages.push({
          role: 'bot',
          text: res.reply,
          time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
        });
        this.scrollToBottom();
      },
      error: () => {
        this.isTyping = false;
        const fallback = this.chatbotService.getLocalResponse(text);
        this.messages.push({
          role: 'bot',
          text: fallback,
          time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
        });
        this.scrollToBottom();
      }
    });
  }

  sendQuickReply(key: string) {
    const map: any = {
      'bills': 'Check my bills',
      'savings': 'View savings',
      'electricity': 'Pay electricity',
      'budget': 'Budget summary',
      'send': 'Send money'
    };
    this.inputText = map[key] || key;
    this.sendMessage();
  }

  private scrollToBottom() {
    try {
      if (this.messagesEnd) {
        this.messagesEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (err) {}
  }
}
