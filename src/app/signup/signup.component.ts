import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnChange() {
    Object.keys(this.signupForm.controls).forEach(key => {
      // Get errors of every form control
      //@ts-ignore
      console.log(this.signupForm.get(key).errors);
    })
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.setValue({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }
}
