import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tareas } from '../tareas';

@Component({
  selector: 'app-tareas',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})
export class TareasComponent {
  title = 'TORTURA';

  hola: boolean = false;
  usuario: Tareas[] = [];
  accionDropdown: any[] = [];
  mostrarContenedor: boolean = false;
  mostrarContenedor2: boolean = false;
  modoEdicion: boolean = false;
  indiceEdicion: number | null = null;

  formularioUsuarios: FormGroup;

  constructor(private fb: FormBuilder) {
    this.usuario = [
      {
        tarea: "Prueba",
        asunto: "Esto es una prueba",
        fecha: "10-2030-1012",
        hora: "1:00an",
        estado: "pendiente"
      },

    ];

    // Opciones del dropdown de estado
    this.accionDropdown = [
      { id: 'pendiente', nombre: 'Pendiente' },
      { id: 'completada', nombre: 'Completada' },
      { id: 'noCompletada', nombre: 'No Completada' }
    ];

    // Inicializar el formulario
    this.formularioUsuarios = this.fb.group({
      tarea: ['', Validators.required],
      asunto: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required]
    });
  }

  eliminar(indice: number) {
    this.usuario.splice(indice, 1);
    this.formularioUsuarios.reset();

  }

  agregar() {
    const nuevaTarea = this.formularioUsuarios.value;
    nuevaTarea.estado = "pendiente"; // Asignar estado "Pendiente" por defecto
    this.usuario.push(nuevaTarea);
    this.formularioUsuarios.reset();
    this.mostrarContenedor = false;
  }

  editar(indice: number) {
    this.formularioUsuarios.patchValue(this.usuario[indice]);
    this.mostrarContenedor = true;
    this.modoEdicion = true;
    this.indiceEdicion = indice;
    this.hola = true;
  }

  resetFormulario() {
    this.formularioUsuarios.reset();
    this.modoEdicion = false;
    this.indiceEdicion = null;
    this.mostrarContenedor = false;
  }

  actualizar(indice: number) {
    const estadoOriginal = this.usuario[indice].estado; // Conservar el estado original
    this.usuario[indice] = { ...this.formularioUsuarios.value, estado: estadoOriginal };
  }

  agregarOActualizar() {
    if (this.modoEdicion && this.indiceEdicion !== null) {
      const estadoOriginal = this.usuario[this.indiceEdicion].estado; // Conservar el estado original
      this.usuario[this.indiceEdicion] = { ...this.formularioUsuarios.value, estado: estadoOriginal };
    } else {
      const nuevaTarea = this.formularioUsuarios.value;
      nuevaTarea.estado = "pendiente"; // Asignar estado "Pendiente" por defecto
      this.usuario.push(nuevaTarea);
    }
    this.resetFormulario();
  }


}
