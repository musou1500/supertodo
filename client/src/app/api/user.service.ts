import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  screenId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private client: HttpClient) {}

  findById(id: number) {
    this.client.get<User[]>(`${environment.apiBaseUrl}/users/${id}`);
  }
}
