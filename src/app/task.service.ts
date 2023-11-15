import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';

/**
 * Service for managing tasks and interacting with the backend API.
 */
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  base(): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/base/`;
    return this.http.get(apiUrl, {headers: this.commonService.getHeaders()});
  }

  /**
   * Creates a task by sending a POST request to the backend API.
   * @param taskData - The task to be saved.
   * @returns An observable of the HTTP response.
   */
  createTask(taskData: any): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/task/`;
    return this.http.post(apiUrl, taskData, {headers: this.commonService.getHeaders()});
  }

  /**
   * Gets the task list by sending a GET request to the backend API.
   * @returns An observable of the HTTP response.
   */
  getTaskList(queryParam: any={}): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/task/`;
    const httpOptions ={
      headers: this.commonService.getHeaders(),
      params: queryParam
    }
    return this.http.get(apiUrl, httpOptions);
  }

  /**
   * Updates a task by sending a PATCH request to the backend API.
   * @param taskId - Id of the task to be updated
   * @param taskData - The task to be updated.
   * @returns An observable of the HTTP response.
   */
  updateTask(taskId: number, taskData: any): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/task/${taskId}/`;
    return this.http.patch(apiUrl, taskData, {headers: this.commonService.getHeaders()});
  }

  /**
   * Deletes a task by sending a DELETE request to the backend API.
   * @param taskId - Id of the task to be updated
   * @returns An observable of the HTTP response.
   */
  deleteTask(taskId: number): Observable<any> {
    const apiUrl = `${environment.API_BASE_URL}/task/${taskId}/`;
    return this.http.delete(apiUrl, {headers: this.commonService.getHeaders()});
  }
}
