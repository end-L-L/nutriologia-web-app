import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  // Token Access - Iniciar Sesión
  public iniciarSesion(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/auth/token/`, data, httpOptions);
  }
}
