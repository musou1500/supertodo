import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewTask, Task } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private client: HttpClient) {}

  findAll() {
    this.client.get<Task[]>(`${environment.apiBaseUrl}/tasks`);
  }

  create(data: NewTask) {
    this.client.post<Task>(`${environment.apiBaseUrl}/tasks`, data);
  }

  destroy(id: number) {
    this.client.delete<Task>(`${environment.apiBaseUrl}/tasks/${id}`);
  }
}
