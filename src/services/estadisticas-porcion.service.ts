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
export class EstadisticasPorcionService {

  constructor(
    private http: HttpClient,
  ) { }

  obtenerPorciones(id: number): Observable<any>{
    return this.http.get<any>(`${environment.url_api}/porciones/?paciente=${id}`, httpOptions );
  }
}
