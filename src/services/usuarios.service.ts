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

<<<<<<< HEAD
    if(!this.validatorService.required(data["rol"])){
      error["rol"] = this.errorService.required;
=======
    if(!this.validatorService.required(data["tipo"])){
      error["tipo"] = this.errorService.required;
>>>>>>> 98cfb0ff86e38a112bc6d123f9185bb5ad20734e
    }

    return error;
  }


  //SERVICIOS HTTP
  //SERVICIO PARA REGISTRAR NUEVO USUARIO

  public registrarUsuario (data: any):Observable <any>{
<<<<<<< HEAD
    return this.http.post<any>(`${environment.url_api}/admin/`,data, httpOptions)
=======
    return this.http.post<any>(`${environment.url_api}/usuarios/`,data, httpOptions)
>>>>>>> 98cfb0ff86e38a112bc6d123f9185bb5ad20734e
  }

  // public obtenerListaUsuarios (): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.get<any>(`${environment.url_api}/lista-usuarios/`, {headers:headers});
  // }


    //Funcion para obtener al maestro con su ID
    public getUsuarioByID(idUser: Number){
      return this.http.get<any>(`${environment.url_api}/usuarios/?id=${idUser}` ,httpOptions);
    }

      //Funcion para editar
  // public editarUsuario (data: any): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.put<any>(`${environment.url_api}/usuarios-edit/`, data, {headers:headers});
  // }

  // Funcion para eliminar usuario
  // public eliminarUsuario(idUser: number): Observable <any>{
  //   var token = this.facadeService.getSessionToken();
  //   var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
  //   return this.http.delete<any>(`${environment.url_api}/usuarios-edit/?id=${idUser}`, {headers:headers});
  // }

}
