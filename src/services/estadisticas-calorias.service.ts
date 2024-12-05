import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders ()
}

@Injectable({
  providedIn: 'root'
})
export class EstadisticasCaloriasService {

  constructor(
    private http: HttpClient,
  ) { }

  // obtenerSeguimientos(id: number): Observable<any>{
  //   return this.http.get<any>(`${environment.url_api}/seguimiento-calorias/?paciente=${id}`, httpOptions);
  // }

  obtenerSeguimientos(id: number): Observable<any>{
    return this.http.get<any>(`${environment.url_api}/api/v1/paciente/s-calorico/obtener/${id}`, httpOptions);
  }
}
