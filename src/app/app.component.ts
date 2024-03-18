import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { ChatRoomService } from './chat-room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';

  constructor(
    private authService: AuthService,
    private chatRoomService: ChatRoomService
  ) {}

  ngOnInit() {
    this.chatRoomService.selectRoom('')
    if (this.authService.getToken()) {
      this.authService.getUser().subscribe({
        next: (data) => {
          this.chatRoomService.socket.emit('loggedIn', data.user);
          this.authService.me = data.user;
          console.log(this.authService.me)
        },
        error: (error) => console.log(error),
      });
    }
  }
}
