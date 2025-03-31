import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioOperacionesComponent } from './formulario-operaciones.component';

describe('FormularioOperacionesComponent', () => {
  let component: FormularioOperacionesComponent;
  let fixture: ComponentFixture<FormularioOperacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioOperacionesComponent]
    });
    fixture = TestBed.createComponent(FormularioOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
