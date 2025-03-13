import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { TareasComponent } from './tareas/tareas.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'tareas',
    component: TareasComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrateComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];
