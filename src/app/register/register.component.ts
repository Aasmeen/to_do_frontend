import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    });
    this.error = '';
  }

  onInputFocus() {
    this.error = '';
  }

  /**
   * Used to register a user by passing in user details to register service
   */
  onSubmit() {
    if (this.registerForm.valid) {
      const registerData = {
        username: this.registerForm.value.username,
        first_name: this.registerForm.value.first_name,
        last_name: this.registerForm.value.last_name,
        password: this.registerForm.value.password,
        password2: this.registerForm.value.password2,
      };
      this.authService.register(registerData).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/task']);
        },
        (error) => {
          console.error('Registration failed!', error.error);
          if (error.error.username) {
            this.error = error.error.username;
          } else if (error.error.password) {
            this.error = error.error.password;
          } else {
            this.error = 'Please try again later';
          }
        }
      );
    }
  }

}
