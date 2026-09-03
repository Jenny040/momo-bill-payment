import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
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

    <div *ngIf="isOpen" style="position:fixed;bottom:100px;right:24px;width:400px;max-width:calc(100vw - 48px);height:500px;background:white;border-radius:16px;box-shadow:0 20px 80px rgba(0,0,0,0.2);display:flex;flex-direction:column;z-index:1000;overflow:hidden;">
      <div style="background:#FFCB05;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;">
        <span style="font-weight:700;color:black;">🤖 MoMo Assistant</span>
        <button (click)="toggle()" style="background:rgba(0,0,0,0.1);border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;">✕</button>
      </div>

      <div style="flex:1;overflow-y:auto;padding:12px 16px;background:#F7F7F7;" #messageContainer>
        <div *ngFor="let msg of messages" style="display:flex;margin-bottom:10px;{{ msg.role === 'user' ? 'justify-content:flex-end;' : '' }}">
          <div style="max-width:75%;">
            <div style="padding:8px 12px;border-radius:12px;{{ msg.role === 'user' ? 'background:#FFCB05;color:black;border-bottom-right-radius:4px;' : 'background:white;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.06);' }}">
              {{ msg.text }}
            </div>
            <div style="font-size:10px;color:#999;margin-top:2px;{{ msg.role === 'user' ? 'text-align:right;' : '' }}">{{ msg.time }}</div>
          </div>
        </div>
        <div *ngIf="isTyping" style="display:flex;gap:4px;padding:8px 12px;background:white;border-radius:12px;border-bottom-left-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,0.06);display:flex;gap:4px;">
          <span style="width:8px;height:8px;background:#999;border-radius:50%;animation:bounce 1.4s infinite;animation-delay:0ms;"></span>
          <span style="width:8px;height:8px;background:#999;border-radius:50%;animation:bounce 1.4s infinite;animation-delay:200ms;"></span>
          <span style="width:8px;height:8px;background:#999;border-radius:50%;animation:bounce 1.4s infinite;animation-delay:400ms;"></span>
        </div>
        <div #messagesEnd></div>
      </div>

      <div style="padding:8px 12px;background:white;border-top:1px solid #E5E5E5;display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0;">
        <button *ngFor="let reply of quickReplies" (click)="sendQuickReply(reply)" style="background:#F7F7F7;border:1px solid #E5E5E5;border-radius:20px;padding:4px 12px;font-size:12px;font-weight:500;cursor:pointer;font-family:'Poppins',sans-serif;">{{ reply }}</button>
      </div>

      <div style="padding:8px 12px;background:white;border-top:1px solid #E5E5E5;display:flex;gap:8px;flex-shrink:0;">
        <input [(ngModel)]="inputText" (keyup.enter)="sendMessage()" placeholder="Type a message…" style="flex:1;padding:8px 12px;border:1px solid #E5E5E5;border-radius:8px;font-size:14px;outline:none;font-family:'Poppins',sans-serif;">
        <button (click)="sendMessage()" [disabled]="!inputText.trim()" style="padding:8px 16px;background:#FFCB05;color:black;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-family:'Poppins',sans-serif;">Send</button>
      </div>
    </div>

    <style>
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      .chat-toggle {
        position: fixed; bottom: 24px; right: 24px; width: 56px; height: 56px; border-radius: 50%; background: #FFCB05; border: none; font-size: 24px; cursor: pointer; box-shadow: 0 4px 20px rgba(255,203,5,0.4); z-index: 999;
      }
    </style>
  `,
  styles: []
})
export class ChatbotWidgetComponent implements OnInit {
  @ViewChild('messageContainer') messageContainer!: ElementRef;
  @ViewChild('messagesEnd') messagesEnd!: ElementRef;

  isOpen = false;
  isTyping = false;
  inputText = '';
  messages: any[] = [];
  quickReplies = ['Check my bills', 'View savings', 'Pay electricity', 'Budget summary', 'Send money'];

  constructor(
    private chatbotService: ChatbotService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.messages = [{
      role: 'bot',
      text: 'Hi Thabo! 👋 I\'m your MoMo assistant. How can I help?',
      time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    }];
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) setTimeout(() => this.scrollToBottom(), 100);
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
        this.messages.push({
          role: 'bot',
          text: 'Sorry, I could not reach the assistant. Please try again.',
          time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
        });
        this.scrollToBottom();
      }
    });
  }

  sendQuickReply(text: string) {
    this.inputText = text;
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
