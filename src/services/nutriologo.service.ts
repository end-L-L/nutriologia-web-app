import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacadeService } from './facade.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NutriologoService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

  public createPost(data: any){
    return {
      'first_name': data.first_name,
      'last_name': data.last_name,
      'cedula': data.cedula,
      'telefono': data.telefono,
      'email': data.email,
      'password': data.password,
      'username': data.email,
      'role': data.rol
    }
  }

  public esquemaNutriologo(){
    return {
      'rol':'',
      'first_name': '',
      'last_name': '',
      'cedula': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
    }

  }
///Validación para el formulario
  public validarNutriologo(data: any, editar: boolean){
    console.log("Validando nutriologo... ", data);
    let error: any = [];

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
    }else if(!this.validatorService.numeric(data["telefono"])){
      alert("El formato es solo números");
      error["telefono"] = this.errorService.numeric;
    }else if(!this.validatorService.min(data["telefono"], 10)){
      error["telefono"] = this.errorService.min(12);
      alert("La longitud de caracteres deL telefono es menor, deben ser 10");
    }else if(!this.validatorService.max(data["telefono"], 10)){
      error["telefono"] = this.errorService.max(13);
      alert("La longitud de caracteres deL telefono es mayor, deben ser 10");
    }

    if(!this.validatorService.required(data["cedula"])){
      error["cedula"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["cedula"])){
      alert("El formato es solo números");
      error["cedula"] = this.errorService.numeric;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarNutriologo (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/api/v1/nutriologos/crear/`,data, httpOptions);
  }

  public obtenerListaNutriologos (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-nutriologos/`, {headers:headers});
  }

  //Obtener un solo usuario dependiendo su ID
  public getNutriologoByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/nutriologo/?id=${idUser}`,httpOptions);
  }

  //Servicio para actualizar un usuario
  public editarNutriologo (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/nutriologo-edit/`, data, {headers:headers});
  }
  //Eliminar Admin
  public eliminarNutriologo(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/nutriologo-edit/?id=${idUser}`,{headers:headers});
  }
  //Obtener el total de cada uno de los usuarios
  public getTotalUsuarios(){
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/nutriologo-edit/`, {headers:headers});
  }

}
