import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { ChatRoomService } from '../chat-room.service';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css'
})
export class ChatWindowComponent {
  hidden = true;

  constructor(private chatRoomService:ChatRoomService){}


  ngOnInit(){
    if(this.chatRoomService.currRoom === ''){
      this.hidden = true;
    }
    this.chatRoomService.roomState.subscribe({
      next:(data)=>{
        if(data === ''){
          this.hidden = true;
        }
        else{
          this.hidden = false;
        }
      }
    });
  }
}
