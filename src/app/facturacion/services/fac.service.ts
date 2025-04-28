import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Factura } from '../interfaces/Factura.interfaces';
import { Planes } from 'src/app/planes/interfaces/planes.interface';
import { FacturaID } from '../interfaces/facPorID.interfaces';

@Injectable({
  providedIn: 'root',
})
export class FacService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(`${this.baseUrl}/facturacion/listar`);
  }

  getFacturaById(id: number): Observable<FacturaID> {
    return this.http.get<FacturaID>(`${this.baseUrl}/facturacion/buscar/${id}`);
  }

  postFactura(fac: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.baseUrl}/facturacion/guardar`, fac);
  }
  updateFactura(fac: Factura): Observable<Factura> {
    return this.http.put<Factura>(
      `${this.baseUrl}/facturacion/editar/${fac._id}`,
      fac
    );
  }

  getAllplanes(): Observable<Planes[]> {
    return this.http.get<Planes[]>(`${this.baseUrl}/planes/listar`);
  }
  buscarPorNombre(name: string): Observable<FacturaID[]> {
    return this.http.get<FacturaID[]>(
      `${this.baseUrl}/facturacion/buscarCli/${name}`
    );
  }
}
