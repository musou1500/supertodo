import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, SignupData, Credential, LoginResult } from './models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private client: HttpClient) {}

  signup(data: SignupData) {
    return this.client.post<User>(`${environment}/auth/signup`, data);
  }

  login(credential: Credential) {
    return this.client.post<LoginResult>(
      `${environment}/auth/login`,
      credential
    );
  }
}
