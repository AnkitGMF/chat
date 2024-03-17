import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  errorMessage = '';

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(private authService:AuthService){}

  onSubmit() {
    if(this.signupForm.value.password === this.signupForm.value.confirmPassword){
      this.authService.registerUser(this.signupForm.value.username,this.signupForm.value.password).subscribe({
        next: data => console.log(data),
        error: error => this.errorMessage = error.error.message
      });
    } else {
      console.log('Passwords do not match');
    }

    this.signupForm.setValue({
      username: '',
      password: '',
      confirmPassword: ''
    });
  }
}
