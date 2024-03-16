import { Component,Input } from '@angular/core';
import type { ChatRoom } from '../../ChatRoomInterface';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent {
  @Input() room!: ChatRoom;
}
