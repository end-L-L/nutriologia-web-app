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
export class AdministradoresService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

  public esquemaAdmin(){
    return {
      'rol':'',
      'clave_admin': '',
      'name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
    }
  }
//Validación para el formulario
  public validarAdmin(data: any, editar: boolean){
    console.log("Validando admin... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["clave_admin"])){
      error["clave_admin"] = this.errorService.required;
    }

    if(!this.validatorService.required(data["name"])){
      error["name"] = this.errorService.required;
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
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarAdmin (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/admin/`,data, httpOptions);
  }

  public obtenerListaAdmins (): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/lista-admins/`, {headers:headers});
  }

  //Obtener un solo usuario dependiendo su ID
  public getAdminByID(idUser: Number){
    return this.http.get<any>(`${environment.url_api}/admin/?id=${idUser}`,httpOptions);
  }

  //Servicio para actualizar un usuario
  public editarAdmin (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/admins-edit/`, data, {headers:headers});
  }
  //Eliminar Admin
  public eliminarAdmin(idUser: number): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.delete<any>(`${environment.url_api}/admins-edit/?id=${idUser}`,{headers:headers});
  }
  //Obtener el total de cada uno de los usuarios
  public getTotalUsuarios(){
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.get<any>(`${environment.url_api}/admins-edit/`, {headers:headers});
  }

}
