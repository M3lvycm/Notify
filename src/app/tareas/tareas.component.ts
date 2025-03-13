import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Tareas } from '../tareas';
import Swal from 'sweetalert2';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-tareas',
  imports: [NavbarComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
})
export class TareasComponent {
  title = 'TORTURA';

  hola: boolean = false;
  tareas: Tareas[] = [];
  accionDropdown: any[] = [];
  mostrarContenedor: boolean = false;
  mostrarContenedor2: boolean = false;
  modoEdicion: boolean = false;
  indiceEdicion: number | null = null;
  terminoBusqueda: string = ''; // Nueva propiedad para el término de búsqueda

  formularioTareas: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tareas = [];

    this.accionDropdown = [
      { id: 'pendiente', nombre: 'Pendiente' },
      { id: 'completada', nombre: 'Completada' },
      { id: 'noCompletada', nombre: 'No Completada' },
    ];

    this.formularioTareas = this.fb.group({
      id: [0],
      tarea: ['', Validators.required],
      asunto: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
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
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.tareas.splice(indice, 1);
        Swal.fire('¡Borrado!', 'La tarea ha sido eliminada.', 'success');
        this.resetFormulario();
      }
    });
  }

  editar(indice: number) {
    this.formularioTareas.patchValue(this.tareas[indice]);
    this.mostrarContenedor = true;
    this.modoEdicion = true;
    this.indiceEdicion = indice;
    this.hola = true;
  }

  resetFormulario() {
    this.formularioTareas.reset();
    this.modoEdicion = false;
    this.indiceEdicion = null;
    this.mostrarContenedor = false;
  }


  agregarOActualizar() {
    if (this.modoEdicion && this.indiceEdicion !== null) {
      const estadoOriginal = this.tareas[this.indiceEdicion].estado; 
      this.tareas[this.indiceEdicion] = {
        ...this.formularioTareas.value,
        estado: estadoOriginal != 'pendiente' ? 'pendiente' :estadoOriginal
      };
    } else {
      const lastTarea = this.tareas[this.tareas.length -1];
      const id = lastTarea ? lastTarea.id + 1 : 1;
      const nuevaTarea = this.formularioTareas.value;
      nuevaTarea.estado = 'pendiente'; // Asignar estado "Pendiente" por defecto
      nuevaTarea.id = id;
      this.tareas.push(nuevaTarea);

    }
    this.resetFormulario();
  }

  cambiarEstado(event: Event, tareaId: number) {
    const selectElement = event.target as HTMLSelectElement;
    const nuevoEstado = selectElement.value;
    const tituloEstado = selectElement.options[selectElement.selectedIndex].text;

    const tarea = this.tareas.find((tarea) => tarea.id === tareaId);
    tarea!.estado = nuevoEstado;

      Swal.fire({
        title: '¡Hecho!',
        text: `El estado de la tarea ha sido actualizado a ${tituloEstado}.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
  }

  filtrarTareas(): Tareas[] {
    if (!this.terminoBusqueda) {
      return this.tareas;
    }

    return this.tareas.filter((tarea, index) => {
      // Busca por número de tarea (índice + 1)
      const numeroTarea = (index + 1).toString();

      // Busca por hora, fecha y estado
      return (
        numeroTarea.includes(this.terminoBusqueda.toLowerCase()) || // Busca por número
        tarea.tarea
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) || // Busca por nombre de tarea
        tarea.asunto
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) || // Busca por asunto
        tarea.fecha
          .toLowerCase()
          .includes(this.terminoBusqueda.toLowerCase()) || // Busca por fecha
        tarea.hora.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) || // Busca por hora
        tarea.estado.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) // Busca por estado
      );
    });
  }
}
