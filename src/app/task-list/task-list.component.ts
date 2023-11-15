import { Component, Input, OnInit, ElementRef, HostListener } from '@angular/core';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() task!: Task;
  showTickCircle: boolean;
  taskInput: string;
  strikeTaskTitle: boolean;
  inputSchedule: boolean;
  inputReminder: boolean;
  scheduleDate: string;
  remiderDate: string;
  scheduleInputDate: string;
  scheduleInputTime: string;
  reminderInputDate: string;
  reminderInputTime: string;
  saveScheduleButton: boolean;
  saveReminderButton: boolean;

  constructor(private elRef: ElementRef, private taskService: TaskService) {
    this.showTickCircle = false;
    this.taskInput = '';
    this.strikeTaskTitle = false;
    this.inputSchedule = false;
    this.inputReminder = false;
    this.scheduleDate = '';
    this.remiderDate = '';
    const today = new Date();
    this.scheduleInputDate = today.toDateString();
    this.scheduleInputTime = today.toTimeString();
    this.reminderInputDate = today.toDateString();
    this.reminderInputTime = today.toTimeString();
    this.saveScheduleButton = false;
    this.saveReminderButton = false;
  }

  ngOnInit() {
    if (this.task) {
      this.taskInput = this.task.title;
      this.strikeTaskTitle = this.task.is_completed;
      const formatter = new Intl.DateTimeFormat('en-IN', { 
        year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true 
      });
      this.scheduleDate = formatter.format(
        new Date(this.task.schedule)
      ).replace(/(\d+:\d+ [APMapm]+)/, (_, time) => time.toUpperCase());
      this.remiderDate = formatter.format(
        new Date(this.task.reminder)
      ).replace(/(\d+:\d+ [APMapm]+)/, (_, time) => time.toUpperCase());
    }
  }

  toggleStrike() {
    if (this.task.is_completed) {
      this.strikeTaskTitle = !this.strikeTaskTitle;
    }
  }

  toggleInputSchedule() {
    this.inputSchedule = !this.inputSchedule;
    this.inputReminder = false;
  }

  toggleInputReminder() {
    this.inputReminder = !this.inputReminder;
    this.inputSchedule = false;
  }

  showTick() {
    this.showTickCircle = true;
    if (!this.task.is_completed) {
      this.strikeTaskTitle = true;
    }
  }

  hideTick() {
    this.showTickCircle = false;
    if (!this.task.is_completed) {
      this.strikeTaskTitle = false;
    }
  }

  enableSaveScheduleButton() {
    const currentDate = new Date();
    const inputDate = new Date(this.scheduleInputDate+'$'+this.scheduleInputTime);
    if (inputDate < currentDate){
      this.saveScheduleButton = false;
    } else {
      this.saveScheduleButton = true;
    }  
  }

  enableSaveReminderButton() {
    const currentDate = new Date();
    const inputDate = new Date(this.reminderInputDate+'$'+this.reminderInputTime);
    if (inputDate < currentDate){
      this.saveReminderButton = false;
    } else {
      this.saveReminderButton = true;
    }  
  }

  /**
   * Mark the task as completed by passing in valid payload to updateTask service
   */
  updateIsCompleted() {
    const taskData = {
      is_completed: !this.task.is_completed,
    };
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );
  }

  /**
   * Mark the task as important or not important by passing in valid payload to updateTask service
   */
  updateIsImportant() {
    const taskData = {
      is_important: !this.task.is_important,
    };
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );

  }

  /**
   * Update the task title by passing in updated title to updateTask service
   */
  updateTitle() {
    const taskData = {
      title: this.taskInput,
    };
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );

  }

  /**
   * Update the task schedule by passing in valid payload to updateTask service
   */
  saveSchedule() {
    const taskData = {
      schedule: new Date(this.scheduleInputDate+'$'+this.scheduleInputTime)
    }
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );
    this.toggleInputSchedule();
  }

  /**
   * Update the task reminder by passing in valid payload to updateTask service
   */
  saveReminder() {
    const taskData = {
      reminder: new Date(this.reminderInputDate+'$'+this.reminderInputTime)
    }
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );
    this.toggleInputReminder();
  }

  /**
   * Remove the task schedule by passing in valid payload to updateTask service
   */
  clearSchedule() {
    const taskData = {
      schedule: null
    }
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );
    this.toggleInputSchedule();
  }

  /**
   * Remove the task reminder by passing in valid payload to updateTask service
   */
  clearReminder() {
    const taskData = {
      reminder: null
    }
    this.taskService.updateTask(this.task.id, taskData).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to update task!', error);
      }
    );
    this.toggleInputReminder();
  }

  /**
   * Delete the task by passing in taskId to deleteTask service
   */
  deleteTask() {
    this.taskService.deleteTask(this.task.id).subscribe(
      (response: any) => {
        window.location.reload();
      },
      (error) => {
        console.error('Unable to delete task!', error);
      }
    );
  }

  /**
   * listener applied on click event
   * whenever the user clicks out of the add task element we need to close the add button div
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedOutsideScheduleDivs = !this.isDescendant(
      this.elRef.nativeElement.querySelector('#schedule-input-div'), event.target
    );

    if (clickedOutsideScheduleDivs) {
      this.inputSchedule = false;
    }

    const clickedOutsideReminderDivs = !this.isDescendant(
      this.elRef.nativeElement.querySelector('#reminder-input-div'), event.target
    );

    if (clickedOutsideReminderDivs) {
      this.inputReminder = false;
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
