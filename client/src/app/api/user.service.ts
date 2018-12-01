import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, PaginateOptions } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private client: HttpClient) {}

  findById(id: number) {
    return this.client.get<User>(`${environment.apiBaseUrl}/users/${id}`);
  }

  findAll(opts: PaginateOptions) {
    const params = new HttpParams({
      fromObject: opts as any
    });

    return this.client.get<User[]>(`${environment.apiBaseUrl}/users/`, {
      params
    });
  }
}
