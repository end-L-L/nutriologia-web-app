import { Component, Input, OnInit } from '@angular/core';
import { PacienteService } from 'src/services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/services/facade.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditarUserModalComponent } from 'src/app/modals/editar-user-modal/editar-user-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // agregado por Gerardo

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
  registroForm: FormGroup; //agregado por Gerardo

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
    public dialog: MatDialog,
    private fb: FormBuilder // agregado por Gerardo
  ){
    //agregado por Gerardo
    this.registroForm = this.fb.group({
    first_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    last_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
  }
  // agregado por Gerardo
  validateLetters1(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  }

  // Agregado por Gerardo
  validateNumbers(event: KeyboardEvent): void {
    const charCode = event.charCode;
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    
    // Permite solo números (charCode entre 48 y 57) y el retroceso (charCode 8)
    if ((charCode < 48 || charCode > 57) && charCode !== 8) {
      event.preventDefault();  // Evita que el carácter se registre si no es un número
    }
    
    // Valida que no se exceda el valor máximo de 120
    setTimeout(() => {
      let currentAge = parseInt(currentValue, 10);
      if (currentAge > 120) {
        input.value = '120'; // Si es mayor a 120, establece el valor a 120
        this.paciente.edad = '120'; // Actualiza el modelo de datos
      }
    }, 0); // Ejecuta después de la actualización del valor del campo
  }
    

  //Agregado por Gerardo
  validarFlotante(event: any, campo: string): void {
    let value = event.target.value;
  
    // Asegurarse de que solo sean números y hasta dos decimales
    let decimalIndex = value.indexOf('.');
  
    // Si el valor contiene un punto decimal
    if (decimalIndex !== -1) {
      let decimalPart = value.slice(decimalIndex + 1);
      
      // Limitar los decimales a dos
      if (decimalPart.length > 2) {
        value = parseFloat(value).toFixed(2); // Limitar a dos decimales
      }
    }
  
    // Asignar el valor corregido
    this.paciente[campo] = value;
  
    // Validación de error si el valor no es un número o excede los límites
    if (isNaN(value) || value < 0 || value > 999 || !/^(\d+(\.\d{0,2})?)?$/.test(value)) {
      this.errors[campo] = "El valor debe ser un número válido entre 0 y 999, con hasta 2 decimales";
    } else {
      this.errors[campo] = "";
    }
  }
    
  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista asignamos los datos del user
      //this.paciente = this.datos_user;
      this.obtenerDatosPaciente();
      this.paciente = this.pacienteService.getPacienteByID(this.idUser);
      console.log("Datos Paciente Editar: ", this.datos_user);
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

      let post_data = this.pacienteService.createPost(this.paciente);

      //console.log("Post data: ", post_data);

      this.pacienteService.registrarPaciente(post_data).subscribe({
        next: (response) => {
          alert('Usuario Registrado Correctamente');
          //console.log(response);
          this.router.navigate(['nutriologo-screen']);
        },
        error: (response) => {
          alert('¡Error!: No se Pudo Registrar Usuario \nResponse: ' + response.error.message);
          console.log(response.error);
        },
      });

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

    let id = this.paciente.id;
    this.paciente = this.pacienteService.createPost(this.paciente);
    this.paciente.id = id

    const dialogRef = this.dialog.open(EditarUserModalComponent,{
      data: {rol: 'paciente'}, //Se pasan valores a través del componente
      height: '288px',
      width: '328px',
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result.isEdit){
        this.pacienteService.editarPaciente(this.paciente).subscribe({
          next: (response)=>{
            alert("Paciente editado correctamente");
            console.log("Paciente editado: ", response);
            //Si se editó, entonces mandar al home
            this.router.navigate(["nutriologo-screen"]);
          },
          error: (error)=>{
            alert("No se pudo editar al paciente");
            console.log("Error: ", error);
          }
        });
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

  public obtenerDatosPaciente(){
    this.pacienteService.getPacienteByID(this.idUser).subscribe({
      next: (response) => {
        this.paciente = response;
        this.paciente.first_name = response.user.first_name;
        this.paciente.last_name = response.user.last_name;
        this.paciente.email = response.user.email;
        this.paciente.objetivo = response.objetivo.toString();
        this.paciente.dieta = response.tipo_dieta.toString();
        //console.log("Datos Paciente: ", this.paciente);
      },
      error: (response) => {
        alert('¡Error!: No se Pudo Obtener Datos de Paciente \nResponse: ' + response.error.message);
        //console.log(response.error);
      },
    });
  }
}
