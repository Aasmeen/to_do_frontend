import { Component, ElementRef, HostListener } from '@angular/core';

import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  addTask: boolean;
  showAddIcon: boolean;
  taskTitle: string;
  
  constructor(
    private elRef: ElementRef,
    private taskService: TaskService
  ) { 
    this.addTask = false;
    this.showAddIcon = true;
    this.taskTitle = '';
  }

  toggleAddTaskOnFocus() {
    this.addTask = true;
    this.showAddIcon = false;
  }

  /**
   * Create the task by passing in the task title and using createTask service
   */
  createTask() {
    const taskData = {
      title: this.taskTitle,
    };
    this.taskService.createTask(taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to add task!', error);
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
      this.elRef.nativeElement.querySelector('#add-task'), event.target
    );

    if (clickedOutsideDivs) {
      this.addTask = false;
      this.showAddIcon = true;
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
