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
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService,
  ) { }

  public esquemaUsuario(){
    return {
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'rol': '',
    }
  }

  // Validación del formulario
  public validarUsuario(data: any, editar: boolean){
    console.log("validando usuario...", data);
    let error: any = [];

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data["telefono"])) {
      error["telefono"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["rol"])) {
      error["rol"] = this.errorService.required;
    }

    return error;
  }

  // SERVICIOS HTTP
  // Servicio para registrar un nuevo usuario
  public registrarUsuario(data: any): Observable<any> {
    return this.http.post<any>(`${environment.url_api}/usuarios/`, data, httpOptions);
  }

  // Servicio para obtener un usuario por ID
  public getUsuarioByID(idUser: number): Observable<any> {
    return this.http.get<any>(`${environment.url_api}/usuarios/?id=${idUser}`, httpOptions);
  }

  // Función para eliminar un usuario (comentada)
  public eliminarUsuario(idUser: number): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.delete<any>(`${environment.url_api}/usuarios-edit/?id=${idUser}`, { headers: headers });
  }

  // Función para editar usuario (comentada)
  public editarUsuario(data: any): Observable<any> {
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    return this.http.put<any>(`${environment.url_api}/usuarios-edit/`, data, { headers: headers });
  }

}
