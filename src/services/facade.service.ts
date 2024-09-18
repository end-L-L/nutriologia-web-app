import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ValidatorService } from './tools/validator.service';
import { ErrorService } from './tools/error.service';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

//Variables para las cookies
const session_cookie_name = 'RoomMate-token';
const user_email_cookie_name = 'RoomMate-email';
const user_id_cookie_name = 'RoomMate-user_id';
const user_complete_name_cookie_name = 'RoomMate-user_complete_name';
const group_name_cookie_name = 'RoomMate-group_name';
const codigo_cookie_name = 'RoomMate-codigo';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(
    private http: HttpClient,
    public router: Router,
    private cookieService: CookieService,
    private validatorService: ValidatorService,
    private errorService: ErrorService,
  ) { }

    //Validar login
  //Funcion para validar login
  public validarLogin(username: String, password: String){
    var data = {
      "username": username,
      "password": password
    }
    console.log("Validando login... ", data);
    let error: any = [];

    if(!this.validatorService.required(data["username"])){
      error["username"] = this.errorService.required;
    }else if(!this.validatorService.max(data["username"], 40)){
      error["username"] = this.errorService.max(40);
    }
    else if (!this.validatorService.email(data['username'])) {
      error['username'] = this.errorService.email;
    }

    if(!this.validatorService.required(data["password"])){
      error["password"] = this.errorService.required;
    }

    return error;
  }

  saveUserData(user_data:any){
    var secure = environment.url_api.indexOf("https")!=-1;
    if(user_data.rol == "administrador"){
      this.cookieService.set(user_id_cookie_name, user_data.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.first_name + " " + user_data.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }else{
      this.cookieService.set(user_id_cookie_name, user_data.user.id, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_email_cookie_name, user_data.user.email, undefined, undefined, undefined, secure, secure?"None":"Lax");
      this.cookieService.set(user_complete_name_cookie_name, user_data.user.first_name + " " + user_data.user.last_name, undefined, undefined, undefined, secure, secure?"None":"Lax");
    }
    this.cookieService.set(session_cookie_name, user_data.token, undefined, undefined, undefined, secure, secure?"None":"Lax");
    this.cookieService.set(group_name_cookie_name, user_data.rol, undefined, undefined, undefined, secure, secure?"None":"Lax");
  }
}
