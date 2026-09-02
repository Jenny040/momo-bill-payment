<<<<<<< HEAD
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../core/services/chatbot.service';
import { LanguageService } from '../../core/services/language.service';
=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../core/services/chatbot.service';

interface Message {
  from: 'user' | 'bot';
  text: string;
}
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
<<<<<<< HEAD
  template: `
    <button *ngIf="!isOpen" (click)="toggle()" class="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8 w-14 h-14 bg-[#FFCB05] rounded-full shadow-lg shadow-[#FFCB05]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 2H4a2 2 0 00-2 2v12a2 2 0 002 2h4l4 4 4-4h4a2 2 0 002-2V4a2 2 0 00-2-2z" fill="#000"/></svg>
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-[#E74C3C] rounded-full border-2 border-white"></span>
    </button>

    <div *ngIf="isOpen" class="fixed inset-0 md:inset-auto md:bottom-8 md:right-8 z-50 md:w-96 flex flex-col bg-white md:rounded-3xl shadow-2xl shadow-black/20 md:max-h-[600px] overflow-hidden">
      <div class="flex items-center gap-3 px-4 py-3.5 bg-[#FFCB05] flex-shrink-0">
        <div class="w-9 h-9 rounded-full bg-black flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M15 2H3a1 1 0 00-1 1v8a1 1 0 001 1h3l3 3 3-3h3a1 1 0 001-1V3a1 1 0 00-1-1z" fill="#FFCB05"/></svg>
        </div>
        <div class="flex-1">
          <div class="font-semibold text-black text-sm">MoMo Assistant</div>
          <div class="flex items-center gap-1"><span class="w-1.5 h-1.5 bg-[#00A86B] rounded-full"></span><span class="text-xs text-black/60">Online</span></div>
        </div>
        <button (click)="toggle()" class="p-1.5 hover:bg-black/10 rounded-lg transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 2l12 12M14 2L2 14" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F7F7F7]" #messageContainer>
        <div *ngFor="let msg of messages" class="flex" [class.justify-end]="msg.role === 'user'" [class.justify-start]="msg.role === 'bot'">
          <div *ngIf="msg.role === 'bot'" class="w-7 h-7 rounded-full bg-[#FFCB05] flex items-center justify-center text-xs font-bold text-black mr-2 mt-0.5 flex-shrink-0">M</div>
          <div class="max-w-[80%]">
            <div class="px-4 py-3 rounded-2xl text-sm whitespace-pre-line leading-relaxed"
                 [class.bg-black]="msg.role === 'user'"
                 [class.text-white]="msg.role === 'user'"
                 [class.bg-white]="msg.role === 'bot'"
                 [class.text-[#1A1A1A]]="msg.role === 'bot'"
                 [class.rounded-br-sm]="msg.role === 'user'"
                 [class.rounded-bl-sm]="msg.role === 'bot'">
              {{ msg.text }}
            </div>
            <div class="text-xs text-[#999] mt-1" [class.text-right]="msg.role === 'user'">{{ msg.time }}</div>
          </div>
        </div>
        <div *ngIf="isTyping" class="flex items-center gap-2">
          <div class="w-7 h-7 rounded-full bg-[#FFCB05] flex items-center justify-center text-xs font-bold text-black">M</div>
          <div class="bg-white px-4 py-3 rounded-2xl rounded-bl-sm border border-[#E5E5E5] shadow-sm flex gap-1 items-center">
            <span class="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style="animation-delay:0ms"></span>
            <span class="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style="animation-delay:150ms"></span>
            <span class="w-1.5 h-1.5 bg-[#999] rounded-full animate-bounce" style="animation-delay:300ms"></span>
          </div>
        </div>
        <div #messagesEnd></div>
      </div>

      <div class="px-3 py-2 bg-white border-t border-[#E5E5E5] flex gap-2 overflow-x-auto flex-shrink-0">
        <button *ngFor="let reply of quickReplies" (click)="sendQuickReply(reply)" class="flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full bg-[#F7F7F7] text-[#1A1A1A] border border-[#E5E5E5] hover:bg-[#FFCB05] hover:border-[#FFCB05] hover:text-black transition-colors whitespace-nowrap">{{ reply }}</button>
      </div>

      <div class="px-3 py-3 bg-white border-t border-[#E5E5E5] flex items-center gap-2 flex-shrink-0">
        <input [(ngModel)]="inputText" (keyup.enter)="sendMessage()" placeholder="Type a message…" class="flex-1 bg-[#F7F7F7] rounded-xl px-4 py-2.5 text-sm text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#FFCB05]/30 border border-transparent focus:border-[#FFCB05]/30">
        <button (click)="sendMessage()" [disabled]="!inputText.trim()" class="w-10 h-10 rounded-xl bg-[#FFCB05] flex items-center justify-center text-black hover:bg-[#FFCB05]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 8L2 2l2 6-2 6 12-6z" fill="currentColor"/></svg>
        </button>
      </div>
    </div>
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

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    this.messages = [{
      role: 'bot',
      text: 'Hi Thabo! 👋 I\'m your MoMo assistant. I can help you pay bills, check your savings, or manage your budget. What can I do for you?',
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
          text: 'I can help with bills, savings, budget tracking, and sending money. Try asking: "Check my bills" or "Budget summary".',
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
=======
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
>>>>>>> 4d5bc819185c2de2cff7eff3636951a507871ffb
