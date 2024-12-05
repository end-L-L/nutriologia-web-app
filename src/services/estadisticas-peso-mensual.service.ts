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
export class EstadisticasPesoMensualService {

  constructor(
    private http: HttpClient,
  ) { }

  // getPesosMensuales(id: number): Observable<any>
  // {
  //   return this.http.get<any>(`${environment.url_api}/peso-mensual/?paciente=${id}`);
  // }

  obtenerPesosMensuales(id: number): Observable<any>{
    return this.http.get<any>(`${environment.url_api}/api/v1/paciente/peso/obtener/${id}`, httpOptions);
  }
}