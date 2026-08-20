import { Component } from '@angular/core';
import { BillsComponent } from './bills/bills.component';
import { ChatbotWidgetComponent } from './chatbot-widget/chatbot-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BillsComponent, ChatbotWidgetComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'MoMo Mini App - Everyday Essentials';
}
