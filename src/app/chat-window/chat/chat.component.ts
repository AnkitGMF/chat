import { Component } from '@angular/core';
import {messages} from '../../../../dummy';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages = messages;
  
}
