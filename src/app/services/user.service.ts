import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users'; // Замените на URL вашего Express API

  constructor(private http: HttpClient) {}

  getUsers() {
    console.log('getUsers');
    return this.http.get<any[]>(this.apiUrl);
  }

  createUser(user: any) {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: string, user: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
