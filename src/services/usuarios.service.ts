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
    return{
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'tipo': '',

    }
  }

  //validación del formulario

  public validarUsuario(data: any, editar: boolean){
    console.log("validando usuario...", data);
    let error: any = [];

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["first_name"])){
      error["first_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["last_name"])){
      error["last_name"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["email"])){
      error["email"] = this.errorService.required;
    }else if(!this.validatorService.max(data["email"], 40)){
      error["email"] = this.errorService.max(40);
    }else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if(!editar){
      if(!this.validatorService.required(data["password"])){
        error["password"] = this.errorService.required;
      }

      if(!this.validatorService.required(data["confirmar_password"])){
        error["confirmar_password"] = this.errorService.required;
      }
    }


    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["tipo"])){
      error["tipo"] = this.errorService.required;
    }

    return error;
  }


  //SERVICIOS HTTP
  //SERVICIO PARA REGISTRAR NUEVO USUARIO

  public registrarUsuario (data: any):Observable <any>{
    return this.http.post<any>(`${environment.url_api}/usuarios/`,data, httpOptions)
  }

  // public obtenerListaMaestros (): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.get<any>(`${environment.url_api}/lista-maestros/`, {headers:headers});
  // }


    //Funcion para obtener al maestro con su ID
    public getMaestroByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/maestros/?id=${idUser}` ,httpOptions);
    }

      //Funcion para editar
  // public editarMaestro (data: any): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.put<any>(`${environment.url_api}/maestros-edit/`, data, {headers:headers});
  // }

  // Funcion para eliminar Maestro
  // public eliminarMaestro(idUser: number): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.delete<any>(`${environment.url_api}/maestros-edit/?id=${idUser}`, {headers:headers});
  // }

}
