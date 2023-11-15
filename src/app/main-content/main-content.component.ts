import { Component, OnInit } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskListDataService } from '../task-list-data.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  incompletedList: Task[] = [];
  completedList: Task[] = [];
  isArrowDown: boolean = false;
  
  constructor(private taskService: TaskService, private taskListDataService: TaskListDataService) {}
  
  toggleArrow() {
    this.isArrowDown = !this.isArrowDown;
  }

  ngOnInit() {
    this.taskListDataService.sharedData$.subscribe((data) => {
      if (data){
        this.incompletedList = data.incomplete_task;
        this.completedList = data.complete_task;
      }
    })
    this.taskService.getTaskList().subscribe(
      (response: any) => {
        this.incompletedList = response.incomplete_task;
        this.completedList = response.complete_task;
      },
      (error) => {
        console.error('Unable to add task!', error);
      }
    );
  }
}
