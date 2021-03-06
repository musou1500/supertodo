import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Tag, NewTag, PaginateOptions } from './models';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  constructor(private client: HttpClient) {}

  findAll(opts: PaginateOptions) {
    const params = new HttpParams({ fromObject: opts as any });
    return this.client.get<Tag[]>(`${environment.apiBaseUrl}/tags`, { params });
  }

  create(data: NewTag) {
    return this.client.post<Tag>(`${environment.apiBaseUrl}/tags`, data);
  }

  destroy(id: number) {
    return this.client.delete<Tag>(`${environment.apiBaseUrl}/tags/${id}`);
  }
}
