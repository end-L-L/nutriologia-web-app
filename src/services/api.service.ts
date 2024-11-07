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

  // Registar Usuario
  public registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/api/v1/nutriologos/crear/`, data, httpOptions);
    //return this.http.post<any>(`https://nutriologia-web-api.onrender.com/api/v1/nutriologos/crear/`,data, httpOptions);
  }

  // Token Access - Iniciar Sesión
  public iniciarSesion(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/auth/token/`, data, httpOptions);
  }
}
