import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
import { FacadeService } from './facade.service';
import { first, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService,
  ) { }

  public esquemaUsuario(){
    return {
      'direccion': '',
      'habitaciones': '',
      'capacidad': '',
      'precio': '',
      'servicios_json ':[],
      'sanitarios': '',
      'telefono': '',
      'estados': '',
    }
  }

  // Validación del formulario
  public validarPropiedad(data: any, editar: boolean){
    console.log("validando usuario...", data);
    let error: any = [];

    if (!this.validatorService.required(data["direccion"])) {
      error["direccion"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["habitaciones"])) {
      error["habitaciones"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["habitaciones"])){
      alert("El formato es solo números");
      error["habitaciones"] = this.errorService.numeric;
    }


    if (!this.validatorService.required(data["capacidad"])) {
      error["capacidad"] = this.errorService.required;
    }

    if (!editar) {
      if (!this.validatorService.required(data["precio"])) {
        error["precio"] = this.errorService.required;
      }
      else if(!this.validatorService.numeric(data["precio"])){
        alert("El formato es solo números");
        error["precio"] = this.errorService.numeric;
      }

      if (!this.validatorService.required(data["servicios_json"])) {
        error["servicios_json"] = this.errorService.required;
      }
      if(data["servicios_json"].length == 0){
        error["servicios_json"] = "Al menos debes elegir una materia";
        //alert("Debes seleccionar materias para poder registrarte.");
      }
      //Return arreglo
      return error;
    }

    if (!this.validatorService.required(data["sanitarios"])) {
      error["sanitarios"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["sanitarios"])){
      alert("El formato es solo números");
      error["sanitarios"] = this.errorService.numeric;
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["telefono"])){
      alert("El formato es solo números");
      error["telefono"] = this.errorService.numeric;
    }

    if (!this.validatorService.required(data["estados"])) {
      error["estados"] = this.errorService.required;
    }

    return error;
  }

  //                    Cambiardirecciones del back
  // SERVICIOS HTTP
  // Servicio para registrar propiedad
  public registrarPropiedad(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/propiedad/`, data, httpOptions);
  }

  public obtenerListaPropiedades (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-propiedades/`, {headers:headers});
  }
  // Servicio para obtener un usuario por ID
  public getPropiedadByID(idUser: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/propiedades/?id=${idUser}`, httpOptions);
  }

  // Función para eliminar un usuario (comentada)
  public eliminarPropiedad(idUser: number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/propiedades-edit/?id=${idUser}`, { headers: headers });
  }

  // Función para editar usuario (comentada)
  public editarPropiedad(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/propiedades-edit/`, data, { headers: headers });
  }

}
