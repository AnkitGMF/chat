import { Component, Output ,EventEmitter} from '@angular/core';
import { ChatRoomService } from '../chat-room.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-chat-modal',
  templateUrl: './new-chat-modal.component.html',
  styleUrl: './new-chat-modal.component.css'
})
export class NewChatModalComponent {
  users:any[] = [];

  @Output() close = new EventEmitter<void>();

  errorMessage = '';

  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  user = new FormControl('', [Validators.required, Validators.minLength(2)]);

  constructor(private chatRoomService: ChatRoomService,private authService:AuthService) {}

  

  addUser(){
    if(this.user.valid){
      if(this.users.includes(this.user.value)){
        return ;
      }
      this.chatRoomService.checkUserExists(this.user.value).subscribe({
        next:(data)=>{
          if(data.exists){
            this.users.push(this.user.value);
            this.user.setValue('');
            this.errorMessage = '';
          }
        },
        error: error => this.errorMessage = error.error.message
      })
    }
  }

  ngOnInit() {
    this.authService.getUser().subscribe({
      next:(data)=>{
        this.users.push(data.user.username);
      }
    });
  }

  onSubmit() {
    this.chatRoomService.createChatRoom(this.name.value,this.users);
    this.closeModal();
  }

  closeModal() {
    this.close.emit();
    this.chatRoomService.closeModal();
  }
  
}
