import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServerResponse } from '../interfaces/server';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  public uploadUser(user: Omit<User, 'id'>): Observable<ServerResponse<User>> {
    return this.http.post<ServerResponse<User>>(`${environment.CHAT_URL}/user`, {
      user,
    });
  }
}
