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
  prevDataLoaded = new Map<string,boolean>();
  me!: string;
  isScrollable = true;

  @ViewChild('chat', { static: true }) chat!: ElementRef;

  constructor(
    private chatRoomService: ChatRoomService,
    private authService: AuthService
  ) {}


  loadPreviousMessages(chatRoomId:string){
    this.chatRoomService.loadExistingMessages(chatRoomId).subscribe({
      next: (data)=>{
        console.log(data);
        this.prevDataLoaded.set(chatRoomId,true);

        if(!this.messageMap.has(chatRoomId)){
          this.messageMap.set(chatRoomId,[])
        }

        //@ts-ignore
        this.messageMap.set(this.chatRoomService.currRoom,data.messages.concat(this.messageMap.get(this.chatRoomService.currRoom)))
        this.messages = this.messageMap.get(this.chatRoomService.currRoom);
        this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight
      }
    })
  }

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
      },
    });

    this.chatRoomService.roomState.subscribe({
      next: (data) => {
        if (this.messageMap.has(data)) {
          this.messages = this.messageMap.get(data);
        } else {
          this.messageMap.set(data, []);
          this.messages = this.messageMap.get(data);
        }

        if(!this.prevDataLoaded.get(data)){
          this.loadPreviousMessages(data)
        }

        console.log(this.messages);

      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  scrollNow(){
    if(this.isScrollable){
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight;
    }
  }

  onScroll(event:Event){

    if(this.chat.nativeElement.scrollTop+this.chat.nativeElement.clientHeight!=this.chat.nativeElement.scrollHeight){
      this.isScrollable = false;
    }
    else{
      this.isScrollable = true;
    }

  }
}
