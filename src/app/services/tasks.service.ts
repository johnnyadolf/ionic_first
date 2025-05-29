import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from './../model/task.type';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  http = inject(HttpClient);
  getTasksFromAPI() {
    const url = 'https://api.json-generator.com/templates/YgEoSFVRfV4G/data';
    const headers = new HttpHeaders({
      Authorization: 'Bearer yfjdxpyafvqq957te0uurzodfm4qo301cvvsrb58',
    });
    return this.http.get<Array<Task>>(url, { headers });
  }
}
