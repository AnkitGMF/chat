import { Component,Input } from '@angular/core';
import type { ChatRoom } from '../../interface/chatRoom.interface';
import { ChatRoomService } from '../../chat-room.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent {
  @Input() room!: ChatRoom;

  selected = false;
  constructor(private chatRoomService:ChatRoomService) {}

  ngOnInit(){
    this.chatRoomService.roomState.subscribe({
      next:(data)=>{
        if(data === this.room.chatRoomId){
          this.selected = true;
        }
        else{
          this.selected = false;
        }
      }
    });
  }
}
