import { Component } from '@angular/core';
import { ChatRoomService } from '../chat-room.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { ChatRoom } from '../interface/chatRoom.interface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  chatRooms: ChatRoom[] = [];

  constructor(private chatRoomService:ChatRoomService,private authService:AuthService) { }



  modalId!: string|null;

  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.chatRoomService.getChatRooms().subscribe({
      next:(data)=>{
        console.log('Room Created');
        const {name,chatRoomId} = data;
        this.chatRooms.push({name:name,chatRoomId:chatRoomId});
      }
    });

    const availableRooms = this.authService.getExistingChatRooms();
    if(availableRooms){
      this.chatRooms = availableRooms;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal() {
    this.modalId = 'new-chat-modal';
    this.chatRoomService.openModal(this.modalId);
  }

  closeModal() {
    this.modalId = null;
    this.chatRoomService.closeModal();
  }

  selectRoom(room:string){
    this.chatRoomService.selectRoom(room);
  }
  
}
