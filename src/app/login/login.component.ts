import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  showError: boolean;

  constructor(
    private formBuilder: FormBuilder, private router: Router, private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.showError = false;
  }

  onInputFocus() {
    this.showError = false;
  }

  /**
   * Use to login a user by passing in the user name and password to login service
   */
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.authService.login(loginData).subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.router.navigate(['/task']);
        },
        (error) => {
          console.error('Login failed!', error);
          this.showError = true;
        }
      );
    }
  }
}
