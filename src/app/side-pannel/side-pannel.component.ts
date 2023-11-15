import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-pannel',
  templateUrl: './side-pannel.component.html',
  styleUrls: ['./side-pannel.component.css']
})
export class SidePannelComponent {
  @Input() incomplete_task!: number;
  @Input() important_task!: number;

  constructor() { }

}
