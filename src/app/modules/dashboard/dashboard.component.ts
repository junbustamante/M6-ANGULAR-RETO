import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { StateLogin } from 'src/app/state/state-login';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsultaSaldoService } from 'src/app/servicios/consulta-saldo.service';
import { ModalMessageComponent } from 'src/app/shared/components/modal-message/modal-message.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  fechaActual: string = '';
  horaActual: string = '';
  SaldoCuenta:  number = 0;
  formularioVisible: boolean = false;
  tituloFormulario: string = '';
  formularioEnviado: boolean = false;
  formularioCuenta: FormGroup = new FormGroup({});
  resultadoConsulta: { key: string; value: string }[] = []; // Para almacenar los pares clave-valor
  mostrarResultadoSaldo: boolean = false;
  errorConsulta: string | null = null;
  mostrarResultadoTransacciones: boolean = false;

  constructor(private dialog: MatDialog, public state: StateLogin, private fb: FormBuilder, private consulta: ConsultaSaldoService) {
   
  }

  ngOnInit(): void {
    const now = new Date();
    this.fechaActual = now.toLocaleDateString();
    this.horaActual = now.toLocaleTimeString();
    this.initLoginForm();
  }
  actualizarFechaHora(): void {
    const now = new Date();
    this.fechaActual = now.toLocaleDateString();
    this.horaActual = now.toLocaleTimeString();
  }

  initLoginForm(): void{
    this.formularioCuenta = this.fb.group({
      Cuenta: [''],
      Monto: [''],
      CuentaOrigen: ['']
  })
  }

  mostrarModal(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(ModalMessageComponent, {
      data: { title: titulo, message: mensaje },
      width: '400px'
    });
  }

  mostrarModalConEspera(titulo: string, mensaje: string, tiempoEspera: number = 2000): void {
    const dialogRef = this.dialog.open(ModalMessageComponent, {
      data: { title: titulo, message: mensaje },
      width: '400px',
      
    });
  
    setTimeout(() => {
      dialogRef.close();
    }, tiempoEspera); 
  }
  
  

  mostrarFormulario(tipo: string): void {
    this.formularioVisible = true;
 
    switch (tipo) {
      case 'depositoSucursal':
        this.tituloFormulario = 'Depósito en sucursal';
        break;
      case 'depositoCajero':
        this.tituloFormulario = 'Depósito en cajero automático';
        break;
      case 'depositoCuenta':
        this.tituloFormulario = 'Depósito desde otra cuenta';
        break;
      case 'compraFisica':
        this.tituloFormulario = 'Compra en establecimiento físico';
        break;
      case 'compraWeb':
        this.tituloFormulario = 'Compra en página web';
        break;
      case 'retiroCajero':
        this.tituloFormulario = 'Retiro en cajero';
        break;
       default:
        this.tituloFormulario = 'Formulario';
    }
  }

  enviarFormulario(): void {
    this.mostrarResultadoSaldo = false;
    console.log(this.formularioCuenta.value);
  
    
    switch (this.tituloFormulario) {
      case 'Depósito en sucursal':
        this.postDSucursales(
          this.formularioCuenta.value.Monto,
          this.formularioCuenta.value.Cuenta,
          'http://localhost:8080/transaccion/depositosucursal'
        );
        break;
  
      case 'Depósito en cajero automático':
        this.postDCajero(
          this.formularioCuenta.value.Monto,
          this.formularioCuenta.value.Cuenta,
          'http://localhost:8080/transaccion/depositocajeroelectronico'
        );
        break;
  
      case 'Depósito desde otra cuenta':
        console.log('Cuenta de origen:', this.formularioCuenta.value.CuentaOrigen);
      this.postDepositoOtraCuenta(
        this.formularioCuenta.value.Monto,
        this.formularioCuenta.value.CuentaOrigen,
        this.formularioCuenta.value.Cuenta,        
        'http://localhost:8080/transaccion/trasladocuentas'
      );
      break;
  
      case 'Compra en establecimiento físico':
        this.postCompraFisica(
          this.formularioCuenta.value.Monto,
          this.formularioCuenta.value.Cuenta,
          'http://localhost:8080/transaccion/comprasfisico'
        );
        break;
  
      case 'Compra en página web':
          this.postCompraWeb(
          this.formularioCuenta.value.Monto,
          this.formularioCuenta.value.Cuenta,
          'http://localhost:8080/transaccion/comprasweb'
        );
        break;
  
      case 'Retiro en cajero':
          this.postRetiroCajero(
          this.formularioCuenta.value.Monto,
          this.formularioCuenta.value.Cuenta,
          'http://localhost:8080/transaccion/retirocajeroelectronico'
        );
        break;
  
      default:
        console.error('Tipo de formulario no reconocido:', this.tituloFormulario);
        alert('No se pudo determinar la acción a realizar.');
    }
  }
  
  getSaldoCuenta(): void {
    const url = 'http://localhost:8080/cuenta/saldocuenta?nroCuenta=9876';
  
    this.consulta.getSaldoCuenta(url).subscribe({
      next: (data) => {
        console.log('Respuesta del servidor:', data);
      },
      error: (error) => {
        console.error('Error en la operación:', error);
  
        if (error.status === 200) {
          const rawText = error.error?.text; // Extraer el campo "text"
          if (typeof rawText === 'string') {
            // Procesar la cadena para extraer el valor de "Saldo"
            const saldoMatch = rawText.match(/Saldo\s([\d.]+)/); // Buscar "Saldo" seguido de un número
            const saldo = saldoMatch ? saldoMatch[1] : 'Valor no disponible'; // Extraer el valor o asignar un valor predeterminado
  
            this.resultadoConsulta = [
              { key: 'Saldo', value: saldo },
            ];
            console.log('Resultado procesado:', this.resultadoConsulta); // Verificar el contenido
          } else {
            console.error('El campo "text" no es válido:', rawText);
            this.resultadoConsulta = [{ key: 'Error', value: 'Formato de respuesta no válido' }];
          }
  
          this.mostrarResultadoSaldo = true; // Mostrar la tabla
        }
      }
    });
  }

  getconsultarTransacciones(): void {
    const url = 'http://localhost:8080/transaccion/historialtransacciones?nroCuenta=9876';
  
    this.consulta.getTransacciones(url).subscribe({
      next: (data) => {
        console.log('Transacciones obtenidas:', data);
      },
      error: (error) => {
        console.error('Error al obtener las transacciones:', error);
        if (error.status === 200) {
          const rawText = error.error?.text; // Extraer el texto del error
          console.log('Texto crudo de transacciones:', rawText);
          if (typeof rawText === 'string') {
              const transacciones = rawText
              .split('Transaccion{') 
              .slice(1) 
              .map((transaccion) => {
                const idMatch = transaccion.match(/idTransaccion\s+(\d+)/); 
                const valorMatch = transaccion.match(/valor\s+([\d.]+)/); 
                const tipoMatch = transaccion.match(/tipoTransaccion\s+([^']+)'/);   
                return {
                  id: idMatch ? idMatch[1] : 'Sin ID',
                  valor: valorMatch ? valorMatch[1] : 'Sin valor',
                  tipo: tipoMatch ? tipoMatch[1].trim() : 'Sin tipo',
                };
              });
  
            console.log('Transacciones procesadas:', transacciones);
            this.resultadoConsulta = transacciones.map((transaccion) => ({
              key: `Transacción ${transaccion.id}`,
              value: `Tipo: ${transaccion.tipo}, Valor: ${transaccion.valor}`,
            }));
          } else {
            console.error('El texto de las transacciones no es válido:', rawText);
            this.resultadoConsulta = [{ key: 'Error', value: 'Formato de respuesta no válido' }];
          }
          this.mostrarResultadoTransacciones = true; 
        }
      }
    });
  }
        

  postDCajero(valor: number, cuentaAsociada: number, url: string): void {
    const cuerpo = {
      valor: valor,
      cuentaAsociada: cuentaAsociada
    };
    this.consulta.postDepositoCajero(url, cuerpo).subscribe( {
      next: (data) => {
        console.log('Respuesta del servidor:', data);
        this.mostrarModal('Éxito', 'Deposito en Cajero realizado con exito');
      },
      error: (error) => {
        console.error('Error en la operación:', error.status);
      
        if (error.status === 200) {
          this.mostrarModal('Éxito', 'Deposito en Cajero realizado con éxito');
        } else if (error.status === 400) {
          this.mostrarModal('Error', 'La cuenta asociada no existe');
        } else if (error.status === 404) { // Nueva condición
          this.mostrarModal('Error', 'La cuenta asociada no existe');
        } else {
          this.mostrarModal('Error', `Error inesperado: ${error.status}`);
        }
      } 
    });
      
  this.formularioCuenta.reset();
  }

  postDSucursales(valor: number, cuentaAsociada: number, url: string): void {
      const cuerpo = {
      valor: valor,
      cuentaAsociada: cuentaAsociada
    };
    this.consulta.postDepositoSucursales(url, cuerpo).subscribe( {
      next: (data) => {
        
        console.log('Respuesta del servidor:', data);
        this.mostrarModal('Éxito', 'Deposito en Sucursal realizado con exito');
        
      },
      error: (error) => {
        console.error('Error en la operación:', error.status);
      
        if (error.status === 200) {
          this.mostrarModal('Éxito', 'Deposito en Sucursal realizado con exito');
        } else if (error.status === 400) {
          this.mostrarModal('Error', 'La cuenta asociada no existe');
        } else if (error.status === 404) { 
          this.mostrarModal('Error', 'La cuenta asociada no existe');
        } else {
          this.mostrarModal('Error', `Error inesperado: ${error.status}`);
        }
      } 
    });
      
  this.formularioCuenta.reset();
  }

  postDepositoOtraCuenta(valor: number, cuentaOrigen: number,cuentaDestino: number, url: string): void {
    const cuerpo = {
      valor: valor,
      cuentaDestino: cuentaDestino,
      cuentaOrigen: cuentaOrigen
    };
    this.consulta.postDepositoOtraCuenta(url, cuerpo).subscribe({
      next: (data) => {
        console.log('Respuesta del servidor:', data);
        this.mostrarModal('Éxito', 'Transferencia realizada con éxito');
        
      },
      error: (error) => {
        console.error('Error en la operación:', error.status);
      
        if (error.status === 200) {
          this.mostrarModal('Éxito', 'Transferencia realizada con éxito');
        } else if (error.status === 400) {
          this.mostrarModal('Error', 'La cuenta asociada no existe');
        } else if (error.status === 404) { 
          this.mostrarModal('Error', 'La cuenta asociada no existe');
        } else {
          this.mostrarModal('Error', `Error inesperado: ${error.status}`);
        }
      } 
    });
  
    this.formularioCuenta.reset();
  }

  postCompraFisica(valor: number, cuentaAsociada: number, url: string): void {
    const cuerpo = {
    valor: valor,
    cuentaAsociada: cuentaAsociada
  };
  this.consulta.postCompraFisica(url, cuerpo).subscribe( {
    next: (data) => {
      
      console.log('Respuesta del servidor:', data);
      this.mostrarModal('Éxito', 'Compra realizada con exito');
    },
    error: (error) => {
      console.error('Error en la operación:', error.status);
    
      if (error.status === 200) {
        this.mostrarModal('Éxito', 'Compra realizada con exito');
      } else if (error.status === 400) {
        this.mostrarModal('Error', 'Saldo insuficiente para realizar una compra');
      } else if (error.status === 404) { 
        this.mostrarModal('Error', 'La cuenta asociada no existe');
      } else {
        this.mostrarModal('Error', `Error inesperado: ${error.status}`);
      }
    } 
    
  });
    this.formularioCuenta.reset();
  }

  postCompraWeb(valor: number, cuentaAsociada: number, url: string): void {
    const cuerpo = {
    valor: valor,
    cuentaAsociada: cuentaAsociada
  };
  this.consulta.postCompraWeb(url, cuerpo).subscribe( {
    next: (data) => {
      console.log('Respuesta del servidor:', data);
      this.mostrarModal('Éxito', 'Compra realizada con exito');
    },
    error: (error) => {
      console.error('Error en la operación:', error.status);
    
      if (error.status === 200) {
        this.mostrarModal('Éxito', 'Compra realizada con exito');
      } else if (error.status === 400) {
        this.mostrarModal('Error', 'Saldo insuficiente para realizar una compra');
      } else if (error.status === 404) { 
        this.mostrarModal('Error', 'La cuenta asociada no existe');
      } else {
        this.mostrarModal('Error', `Error inesperado: ${error.status}`);
      }
    } 
  });
    
    this.formularioCuenta.reset();
  }

  postRetiroCajero(valor: number, cuentaAsociada: number, url: string): void {
    const cuerpo = {
    valor: valor,
    cuentaAsociada: cuentaAsociada
  };
  this.consulta.postRetiroCajero(url, cuerpo).subscribe( {
    next: (data) => { 
      console.log('Respuesta del servidor:', data);
      this.mostrarModal('Éxito', 'Retiro realizado con exito');
    },
    error: (error) => {
      console.error('Error en la operación:', error.status);
    
      if (error.status === 200) {
        this.mostrarModal('Éxito', 'Retiro realizado con exito');
      } else if (error.status === 400) {
        this.mostrarModal('Error', 'Saldo insuficiente para realizar un retiro por cajero');
      } else if (error.status === 404) { 
        this.mostrarModal('Error', 'La cuenta asociada no existe');
      } else {
        this.mostrarModal('Error', `Error inesperado: ${error.status}`);
      }
    } 
  });
    
    this.formularioCuenta.reset();
  }

  ocultarFormulario(): void {
    this.mostrarResultadoSaldo = false;
    this.formularioVisible = false;
  }

  ocultarConsulta(): void {
    this.mostrarResultadoSaldo = false;
    this.mostrarResultadoTransacciones = false; // Oculta la tabla
    this.resultadoConsulta = []; // Limpia el resultado
    this.errorConsulta = null; // Limpia el error
  }

  cerrarSesion(): void {

    this.mostrarModal('Espere', 'Estamos cerrando sesion');   
    this.state.logout(); 
    window.location.href = '/login'; 
  }



}
