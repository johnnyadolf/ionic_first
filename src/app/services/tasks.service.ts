import { Task } from './../model/task.type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  taskItems: Array<Task> = [
    {
      id: 1,
      title: 'Task 1',
      completed: false,
      dueDate: new Date('2023-10-01'),
      priority: 'medium',
      isDeleted: false,
    },
    {
      id: 2,
      title: 'Task 2',
      completed: true,
      dueDate: new Date('2023-10-02'),
      priority: 'high',
      isDeleted: false,
    },
    {
      id: 3,
      title: 'Task 3',
      completed: false,
      dueDate: new Date('2023-10-03'),
      priority: 'low',
      isDeleted: false,
    },
  ];
  constructor() {}
}
