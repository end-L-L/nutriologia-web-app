import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private readonly cookieService: CookieService) {}

  public getUser() {
    const session = this.cookieService.get('session');
    return this.http.get<any>(`${environment.url_api}/me/`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });
  }
}
