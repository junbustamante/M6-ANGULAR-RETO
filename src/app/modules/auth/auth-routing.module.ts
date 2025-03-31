import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { rutaGuard } from 'src/app/ruta.guard';


const routes: Routes = [
  {
    path: '',
    component:AuthComponent,
  },
  {
    path: 'boards',   
    component:DashboardComponent,
    canActivate: [rutaGuard],
  },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
