import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() incomplete_task: number = 0;
  @Input() important_task: number = 0;

  constructor() {}
}
