import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NewTask, Task, PaginateOptions } from './models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private client: HttpClient) {}

  findAll(opts: PaginateOptions) {
    const params = new HttpParams({ fromObject: opts as any });
    return this.client.get<Task[]>(`${environment.apiBaseUrl}/tasks`, {
      params
    });
  }

  create(data: NewTask) {
    return this.client.post<Task>(`${environment.apiBaseUrl}/tasks`, data);
  }

  destroy(id: number) {
    return this.client.delete<Task>(`${environment.apiBaseUrl}/tasks/${id}`);
  }
}
