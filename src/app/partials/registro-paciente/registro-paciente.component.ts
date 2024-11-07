import { Component, Input, OnInit } from '@angular/core';
import { PacienteService } from 'src/services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';

//Para poder usar jquery definir esto
declare var $:any;

@Component({
  selector: 'app-registro-paciente',
  templateUrl: './registro-paciente.component.html',
  styleUrls: ['./registro-paciente.component.scss']
})
export class RegistroPacienteComponent implements OnInit{
  @Input() rol: string = "";
  @Input() datos_user: any = {};

 //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';

  public paciente:any= {};
  public token: string = "";
  public errors:any={};
  public editar:boolean = false;
  public idUser: Number = 0;

  //para el select para sanitarios
public dietas: any[] = [
  { value: '1', viewValue: 'Por tiempos' },
  { value: '2', viewValue: 'Por porciones' },
];

public objetivos: any[] = [
  { value: '1', viewValue: 'Perdida de peso' },
  { value: '2', viewValue: 'Ganar masa muscular' },
  { value: '3', viewValue: 'Mejorar la salud' },
];

  constructor(
    private location : Location,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private pacienteService: PacienteService,
    private facadeService: FacadeService,
    public dialog: MatDialog

  ){}

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      this.paciente = this.datos_user;
    }else{
      this.paciente = this.pacienteService.esquemaPaciente();
      this.paciente.rol = this.rol;
      this.token = this.facadeService.getSessionToken();
    }
    //Imprimir datos en consola
    console.log(" Paciente: ", this.paciente);

  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.pacienteService.validarPaciente(this.paciente, this.editar)
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    // Validamos que las contraseñas coincidan
    //Validar la contraseña
    if(this.paciente.password == this.paciente.confirmar_password){
      //Aquí si todo es correcto vamos a registrar - aquí se manda a consumir el servicio
      this.pacienteService.registrarPaciente(this.paciente).subscribe(
        (response)=>{
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        }, (error)=>{
          alert("No se pudo registrar usuario");
        }
      );
    }else{
      alert("Las contraseñas no coinciden");
      this.paciente.password="";
      this.paciente.confirmar_password="";
    }
  }
  public actualizar(){
    //Validación
    this.errors = [];

    this.errors = this.pacienteService.validarPaciente(this.paciente, this.editar);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: {rol: 'paciente'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        this.pacienteService.editarPaciente(this.paciente).subscribe(
          (response)=>{
            alert("Paciente editado correctamente");
            console.log("Paciente editado: ", response);
            //Si se editó, entonces mandar al home
            this.router.navigate(["home"]);
          }, (error)=>{
            alert("No se pudo editar al paciente");
            console.log("Error: ", error);
          }
        );
      }else{
        console.log("No se editó al paciente");
      }
    });
  }

  //Funciones para password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }
}
