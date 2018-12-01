import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Tag {
  id: number;
  name: string;
  color?: string;
}

export interface NewTag {
  name: string;
  color?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private client: HttpClient) {}

  findAll() {
    this.client.get<Tag[]>(`${environment.apiBaseUrl}/tags`);
  }

  create(data: NewTag) {
    this.client.post<Tag>(`${environment.apiBaseUrl}/tags`, data);
  }

  destroy(id: number) {
    this.client.delete<Tag>(`${environment.apiBaseUrl}/tags/${id}`);
  }
}
