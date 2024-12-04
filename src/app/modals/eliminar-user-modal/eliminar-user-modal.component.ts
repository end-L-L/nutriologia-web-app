import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NutriologoService } from 'src/services/nutriologo.service';
import { PacienteService } from 'src/services/paciente.service';


@Component({
  selector: 'app-eliminar-user-modal',
  templateUrl: './eliminar-user-modal.component.html',
  styleUrls: ['./eliminar-user-modal.component.scss']
})
export class EliminarUserModalComponent implements OnInit{

  public rol: string = "";

  constructor(
    private pacienteService: PacienteService,
    private nustriologoService: NutriologoService,
    private dialogRef: MatDialogRef<EliminarUserModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ){}

  ngOnInit(): void {
    this.rol = this.data.rol;
    console.log("Rol modal: ", this.rol);

  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarUser(){
    if(this.rol == "nutriologo"){
      this.nustriologoService.eliminarNutriologo(this.data.id).subscribe({
        next: (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, 
        error: (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      });

    }else if(this.rol == "paciente"){
      this.pacienteService.eliminarPaciente(this.data.id).subscribe({
        next: (response)=>{
          console.log(response);
          this.dialogRef.close({isDelete:true});
        }, 
        error: (error)=>{
          this.dialogRef.close({isDelete:false});
        }
      });

    }
  }

}
