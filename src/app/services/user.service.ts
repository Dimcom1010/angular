import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, User_nodes } from '../components/main/pages/models/User';
import { baseURL } from './API.router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlUsers = `${baseURL}/users`; // Замените на URL вашего Express API

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User_nodes[]>(this.apiUrlUsers);
  }

  createUser(user: User) {
    return this.http.post<any>(this.apiUrlUsers, user);
  }

  updateUser(id: string, user: User) {
    return this.http.put<any>(`${this.apiUrlUsers}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.apiUrlUsers}/${id}`);
  }
}
