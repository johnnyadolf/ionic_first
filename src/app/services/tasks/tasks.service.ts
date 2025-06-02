import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../../model/task.type';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  http = inject(HttpClient);
  private tasks: Task[] = [];

  // Add this isLoading property
  private _isLoading = new BehaviorSubject<boolean>(false);
  public readonly isLoading$: Observable<boolean> =
    this._isLoading.asObservable();

  getTasksFromAPI() {
    const url = 'https://api.json-generator.com/templates/YgEoSFVRfV4G/data';
    const headers = new HttpHeaders({
      Authorization: 'Bearer yfjdxpyafvqq957te0uurzodfm4qo301cvvsrb58',
    });
    return this.http.get<Array<Task>>(url, { headers });
  }

  // Local CRUD operations
  getTasks(): Task[] {
    return this.tasks;
  }

  setTasks(tasks: Task[]): void {
    this.tasks = tasks;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  deleteCompletedTasks(): void {
    this.tasks = this.tasks.filter((t) => !t.completed);
  }

  // Example of how you might use it in a data fetching method
  loadTasks(): Observable<any[]> {
    this._isLoading.next(true); // Set isLoading to true before fetching
    // Or if using a simple boolean: this.isLoading = true;

    return this.http.get<any[]>('/api/tasks').pipe(
      // Replace with your actual API call
      finalize(() => {
        this._isLoading.next(false); // Set isLoading to false after fetching completes
        // Or if using a simple boolean: this.isLoading = false;
      })
    );
  }
}
