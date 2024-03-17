import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ChatRoomService } from '../chat-room.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  errorMessage = '';

  constructor(private authService: AuthService,private router:Router,private chatService:ChatRoomService){}

  onSubmit() {
    this.authService.loginUser(this.loginForm.value.username,this.loginForm.value.password).subscribe({
      next:(data)=>{
        this.authService.setToken(data.token);
        this.authService.me = data.user;
        this.errorMessage='';
        console.log(this.loginForm.value.username)
        this.chatService.socket.emit('loggedIn',this.authService.me);
        this.router.navigate(['/chat']);
        this.loginForm.setValue({
          username: '',
          password: ''
        });
      },
      error: error => this.errorMessage = error.error.message
    });

  }

}


