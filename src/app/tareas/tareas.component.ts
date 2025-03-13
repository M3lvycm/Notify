import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tareas } from '../tareas';
import Swal from 'sweetalert2';

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
  terminoBusqueda: string = ''; // Nueva propiedad para el término de búsqueda

  formularioUsuarios: FormGroup;

  constructor(private fb: FormBuilder) {
    this.usuario = [
      {
        tarea: "Prueba",
        asunto: "Esto es una prueba",
        fecha: "1-4-2025",
        hora: "1:00am",
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Realmente quieres borrar esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuario.splice(indice, 1);
        Swal.fire(
          '¡Borrado!',
          'La tarea ha sido eliminada.',
          'success'
        );
        this.resetFormulario();
      }
    });
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

  cambiarEstado(usuario: Tareas, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    usuario.estado = selectElement.value; // Actualiza el estado
  }

  // Función para filtrar las tareas
  filtrarTareas(): Tareas[] {
    if (!this.terminoBusqueda) {
      return this.usuario; // Si no hay término de búsqueda, devuelve todas las tareas
    }

    return this.usuario.filter((tarea, index) => {
      // Busca por número de tarea (índice + 1)
      const numeroTarea = (index + 1).toString();

      // Busca por hora, fecha y estado
      return (
        numeroTarea.includes(this.terminoBusqueda.toLowerCase()) || // Busca por número
        tarea.tarea.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || // Busca por nombre de tarea
        tarea.asunto.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || // Busca por asunto
        tarea.fecha.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || // Busca por fecha
        tarea.hora.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || // Busca por hora
        tarea.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) // Busca por estado
      );
    });
  }
}
