import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { rutaGuard } from './ruta.guard';
import { DashboardComponent } from './modules/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import (`./modules/auth/auth.module`).then( m=> m.AuthModule ),
    /*canActivate: [rutaGuard],*/
  },
  {
    path: 'home',
    loadChildren: () => import (`./modules/home/home.module`).then( m=> m.HomeModule ),
  },
  {
    path: '**',
    redirectTo: '/home',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
