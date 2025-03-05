import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tareas } from '../tareas';
import { query } from '@angular/animations';




@Component({
  selector: 'app-tareas',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule,FormsModule ],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})




export class TareasComponent {
  title = 'TORTURA';

  hola: boolean = false
  usuario: any[] = [];

  mostrarContenedor: boolean = false;
  mostrarContenedor2: boolean = false;
  modoEdicion: boolean = false;
  indiceEdicion: number | null = null;



    formularioUsuarios : FormGroup;


  constructor (
  private fb: FormBuilder,

  ){

    this.usuario =


    [
       {
         "tarea": "Limpiar la casa",
         "asunto": "ASDKASHDSAJLHDLKADHASKLJDHSAKLDHJASKLDHSLKSHKLSHLDKJHASDKLASHDLKASHDJLSAHJDSKLD",
         "fecha": 10-2030-1012,
         "hora": "1:00an"

       },
       {
        "tarea": "Limpiar la casa",
        "asunto": "ASDKASHDSAJLHDLKADHASKLJDHSAKLDHJASKLDHSLKSHKLSHLDKJHASDKLASHDLKASHDJLSAHJDSKLD",
        "fecha": 10-2030-1012,
        "hora": "1:00an"



       },
       {
         "tarea": "Dominar el mundo",
         "asunto": "ASDKASHDSAJLHDLKADHASKLJDHSAKLDHJASKLDHSLKSHKLSHLDKJHASDKLASHDLKASHDJLSAHJDSKLD",
         "fecha": 10-2030-1012,
         "hora": "1:00an"





       },
       {
        "tarea": "Limpiar la casa",
        "asunto": "ASDKASHDSAJLHDLKADHASKLJDHSAKLDHJASKLDHSLKSHKLSHLDKJHASDKLASHDLKASHDJLSAHJDSKLD",
        "fecha": 10-2030-1012,
        "hora": "1:00an"




      }
     ]
     console.log(this.usuario)

    this.formularioUsuarios =  this.fb.group({
      tarea: ['', Validators.required],
      asunto: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],




  });



  }

  indece(indice: number){
    console.log(indice)

  }


eliminar(indice: number){
  this.usuario.splice(indice, 1 )    // se puede poner la lado de indice un ,1 o 2 o 3 etc
  console.log(this.usuario);


}


  agregar(){
      console.log(this.formularioUsuarios.value);
       this.usuario.push(this.formularioUsuarios.value);
      this.formularioUsuarios.reset();
      // this.mostrarContenedor = !this.mostrarContenedor; // borrar esto y la variable con el mismo nombre arriba par aque todo vuelva a la normalidad y poder actualizar

  }







 editar(indice: number){
  this.formularioUsuarios.patchValue(this.usuario[indice])
  this.mostrarContenedor = !this.mostrarContenedor;
  this.mostrarContenedor = true; // Abre el formulario modal
  this.modoEdicion = true; // Cambia al modo edición
  this.indiceEdicion = indice; // Guarda el índice del elemento que se está editando
  this.hola = true


 }

 resetFormulario() {
  this.formularioUsuarios.reset();
  this.modoEdicion = false;
  this.indiceEdicion = null;
  this.mostrarContenedor = false;
}


  actualizar (indice: number){
  this.usuario[indice] = this.formularioUsuarios.value;
 }



 agregarOActualizar() {
  if (this.modoEdicion && this.indiceEdicion !== null) {
    // Actualizar
    this.usuario[this.indiceEdicion] = this.formularioUsuarios.value;
  } else {
    // Agregar
    this.usuario.push(this.formularioUsuarios.value);
  }
  this.resetFormulario();
}



  // Método para cambiar el estado de mostrarContenedor
  toggleContenedor() {
    this.mostrarContenedor = !this.mostrarContenedor;
  }

  toggleContenedor2() {
    this.mostrarContenedor2 = !this.mostrarContenedor2;
  }


 id(){
  this.hola == true


 }





}




