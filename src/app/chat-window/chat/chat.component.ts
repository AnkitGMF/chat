import { Component, ElementRef, SimpleChange, ViewChild } from '@angular/core';
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
  me!: string;

  @ViewChild('chat', { static: true }) chat!: ElementRef;

  constructor(
    private chatRoomService: ChatRoomService,
    private authService: AuthService
  ) {}

  // ngAfterViewInit(){
  //   this.chat.nativeElement.scrollTo(0, this.chat.nativeElement.scrollHeight);
  // }

  ngOnInit() {
    console.log(this.chat.nativeElement);
    this.me = this.authService.me.username;
    this.chatRoomService.getMessages().subscribe({
      next: (data) => {
        if (this.messageMap.has(data.chatRoomId)) {
          this.messageMap.get(data.chatRoomId)?.push(data);
        } else {
          this.messageMap.set(data.chatRoomId, [data]);
        }
        if(data.chatRoomId===this.chatRoomService.currRoom){
          // this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
        }
      },
    });

    this.chatRoomService.roomState.subscribe({
      next: (data) => {
        if (this.messageMap.has(data)) {
          this.messages = this.messageMap.get(data);
          // this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
        } else {
          this.messageMap.set(data, []);
          this.messages = this.messageMap.get(data);
          // this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
        }
        console.log(this.messages);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  scrollNow(){
    this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
  }
}
