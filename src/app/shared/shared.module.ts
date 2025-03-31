import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FormularioOperacionesComponent } from './components/formulario-operaciones/formulario-operaciones.component';
import { ModalMessageComponent } from './components/modal-message/modal-message.component';


@NgModule({
  declarations: [
    HeaderComponent,
    AlertComponent,
    NavbarComponent,
    CarouselComponent,
    FormularioOperacionesComponent,
    ModalMessageComponent,
  ],
  imports: [
    
    CommonModule,
    FooterComponent],
  exports: [
    HeaderComponent,
    AlertComponent,
    FooterComponent,
    NavbarComponent,
    CarouselComponent,
  ]
})
export class SharedModule { }
