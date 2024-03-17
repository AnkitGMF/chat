import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ChatRoomService } from '../../chat-room.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.css'
})
export class ChatFormComponent {
  message = new FormControl('', [Validators.required, Validators.minLength(1)]);

  constructor(private authService:AuthService,private chatRoomService:ChatRoomService) {}

  onSubmit() {
    if(this.message.invalid) return;
    if(this.chatRoomService.currRoom === '') return;
    this.chatRoomService.socket.emit('send message',{message:this.message.value,sender:this.authService.me.username,chatRoomId:this.chatRoomService.currRoom,createdAt:new Date()})
    this.message.setValue('');
  }
}
