import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaSaldoService {
  
  constructor(private httpClient: HttpClient) { }
   
  getSaldoCuenta(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  getTransacciones(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  postDepositoSucursales(url: string, cuerpo: any) : Observable<any> {
    const body = cuerpo
    console.log(body);
    return this.httpClient.post<any>(url, body);
  }

  postDepositoCajero(url: string, cuerpo: any) : Observable<any> {
    const body = cuerpo
    console.log(body);
    return this.httpClient.post<any>(url, body);
  }

  postDepositoOtraCuenta(url: string, cuerpo: any) : Observable<any> {
    const body = cuerpo
    console.log("cuerpo",body);
    return this.httpClient.post<any>(url, body);
  }

  postCompraFisica(url: string, cuerpo: any) : Observable<any> {
    const body = cuerpo
    console.log("cuerpo",body);
    return this.httpClient.post<any>(url, body);
  }

  postCompraWeb(url: string, cuerpo: any) : Observable<any> {
    const body = cuerpo
    console.log("cuerpo",body);
    return this.httpClient.post<any>(url, body);
  }

  postRetiroCajero(url: string, cuerpo: any) : Observable<any> {
    const body = cuerpo
    console.log("cuerpo",body);
    return this.httpClient.post<any>(url, body);
  }

  
  


}
