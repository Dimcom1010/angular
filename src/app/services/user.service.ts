import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, User_nodes } from '../components/main/pages/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Замените на URL вашего Express API

  constructor(private http: HttpClient) {}

  getUsers() {
    console.log('getUsers');
    return this.http.get<User_nodes[]>(this.apiUrl);
  }

  createUser(user: User) {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: string, user: User) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
