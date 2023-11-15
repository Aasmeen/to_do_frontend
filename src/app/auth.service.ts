import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

/**
 * Service for managing authentication using the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor (
    private http: HttpClient,
    private commonService: CommonService
  ) {}

  /**
   * Used to login a user by sending a POST request to the backend API.
   * @param loginData - login crentials required to login.
   * @returns An observable of the HTTP response.
   */
  login(loginData: any): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/login/`;
    return this.http.post(apiUrl, loginData);
  }

  /**
   * Used to register a user by sending a POST request to the backend API.
   * @param registerData - user data required to register.
   * @returns An observable of the HTTP response.
   */
  register(registerData: any): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/register/`;
    return this.http.post(apiUrl, registerData);
  }

  /**
   * Used to logout a user by sending a POST request to the backend API.
   * @returns An observable of the HTTP response.
   */
  logout(): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/logout/`;
    return this.http.post(apiUrl, {}, {headers: this.commonService.getHeaders()});
  }
}
