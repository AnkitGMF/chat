import { Component } from '@angular/core';
import { ChatRoomService } from '../../chat-room.service';
import { Message } from '../../interface/message.interface';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages!: Message[] | undefined;
  messageMap = new Map<string, Message[]>();
  skipMap = new Map<string, number>();
  me!:string;

  constructor(private chatRoomService: ChatRoomService,private authService:AuthService) {}

  ngOnInit() {
    this.me = this.authService.me.username;

    this.chatRoomService.getMessages().subscribe({
      next: (data) => {
        if (this.messageMap.has(data.chatRoomId)) {
          this.messageMap.get(data.chatRoomId)?.push(data);
        } else {
          this.messageMap.set(data.chatRoomId, [data]);
        }
      },
    });

    this.chatRoomService.roomState.subscribe({
      next: (data) => {
        if(this.messageMap.has(data)){
          this.messages = this.messageMap.get(data);
        }
        else{
          this.messageMap.set(data,[]);
          this.messages = this.messageMap.get(data);
        }
        console.log(this.messages);
      },
    });
  }
}
