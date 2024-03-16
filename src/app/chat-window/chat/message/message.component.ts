import { Component,Input } from '@angular/core';
import type { Message } from '../../../MessageInterface';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() direction: 'left' | 'right' = 'left';
  @Input() message!: Message;

}
