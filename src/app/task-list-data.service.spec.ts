import { TestBed } from '@angular/core/testing';

import { TaskListDataService } from './task-list-data.service';

describe('TaskListDataService', () => {
  let service: TaskListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
