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
export class TiempoService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
    private facadeService: FacadeService
  ) { }

  public esquemaTiempo(){
    return {
      'rol':'',
      'edad': '',
      'peso': '',
    }
  }

  //Validación para el formulario
  public validarTiempo(data: any, editar: boolean){
    console.log("Validando... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["edad"])){
      error["edad"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["edad"])){
      alert("El formato es solo números");
      error["edad"] = this.errorService.numeric;
    }else if(!this.validatorService.min(data["edad"], 2)){
      error["edad"] = this.errorService.min(2);
      alert("La longitud de caracteres de la edad es menor, deben ser 2");
    }else if(!this.validatorService.max(data["edad"], 2)){
      error["edad"] = this.errorService.max(2);
      alert("La longitud de caracteres de la edad es mayor, deben ser 2");


    }

    if(!this.validatorService.required(data["peso"])){
      error["peso"] = this.errorService.required;
    }else if(!this.validatorService.numeric(data["peso"])){
      alert("El formato es solo números");
      error["peso"] = this.errorService.numeric;
    }else if(!this.validatorService.min(data["peso"], 2)){
      error["peso"] = this.errorService.min(2);
      alert("La longitud de caracteres del peso es menor, deben ser 2");
    }else if(!this.validatorService.max(data["peso"], 2)){
      error["peso"] = this.errorService.max(2);
      alert("La longitud de caracteres del peso es mayor, deben ser 2");

    //Return arreglo
    return error;
  }
}

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarTiempo (data: any): Observable <any>{
    return this.http.post<any>(`${environment.url_api}/tiempo/`,data, httpOptions);
  }

  //Servicio para actualizar un usuario
  public editarTiempo (data: any): Observable <any>{
    var token = this.facadeService.getSessionToken();
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' , 'Authorization': 'Bearer '+token});
    return this.http.put<any>(`${environment.url_api}/tiempo-edit/`, data, {headers:headers});
  }

}

