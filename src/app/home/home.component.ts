import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { TaskService } from '../task.service';
import { HttpParams } from '@angular/common/http';
import { TaskListDataService } from '../task-list-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showLogout = false;
  first_name: string;
  last_name: string;
  incomplete_task: number;
  important_task: number;
  userInitials: string;
  searchTaskTitle: string;

  constructor (
    private elRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private taskService: TaskService,
    private taskListDataService: TaskListDataService
  ) {
    this.first_name = '';
    this.last_name = '';
    this.incomplete_task = 0;
    this.important_task = 0;
    this.userInitials = '';
    this.searchTaskTitle = '';
  }

  ngOnInit() {
    this.taskService.base().subscribe(
      (response: any) => {
        this.first_name = response.first_name;
        this.last_name = response.last_name;
        this.incomplete_task = response.incomplete_task;
        this.important_task = response.important_task;
        this.userInitials = (this.first_name[0] + this.last_name[0]).toUpperCase();
      },(error) => {
        console.error(error);
      }
    );
  }

  toggleDropdown() {
    this.showLogout = !this.showLogout;
  }

  searchTask() {
    this.taskService.getTaskList(new HttpParams({
      fromObject: {
        search: this.searchTaskTitle,
      },
    })).subscribe(
      (response: any) => {
        this.taskListDataService.updateSharedData(response); 
        // Main.incompletedList = response.incomplete_task;
        // this.completedList = response.complete_task;
      },
      (error) => {
        console.error('Unable to add task!', error);
      }
    );
  }

  /**
   * Logout the user by calling logout service and redirect back to login page
   */
  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout failed!', error);
      }
    );
  }

  /**
   * listener applied on click event
   * whenever the user clicks out of the add task element we need to close the add button div
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedOutsideDivs = !this.isDescendant(
      this.elRef.nativeElement.querySelector('#user-icon'), event.target
    );

    if (clickedOutsideDivs) {
      this.showLogout = false;
    }
  }

  /**
   * method use to check the decents of an element
   * @param parent - parent element
   * @param child - child element
   * @returns true if child is decendent of parent
   */
  private isDescendant(parent: any, child: any): boolean {
    let node = child.parentNode;

    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }

    return false;
  }
}
