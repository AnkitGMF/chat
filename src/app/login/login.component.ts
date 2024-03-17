import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService,private router:Router){}

  onSubmit() {
    this.authService.loginUser(this.loginForm.value.username,this.loginForm.value.password).subscribe({
      next:(data)=>{
        console.log('Login successful');
        this.authService.setToken(data.token);
        this.errorMessage='';
        this.router.navigate(['/chat']);
      },
      error: error => this.errorMessage = error.error.message
    });

    this.loginForm.setValue({
      username: '',
      password: ''
    });
  }

}


