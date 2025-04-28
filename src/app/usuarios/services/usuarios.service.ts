import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Clientes } from '../interfaces/usuario.interfaces';
import { Planes } from '../../planes/interfaces/planes.interface';
import { IDUsuarios } from '../interfaces/usuId.interface';
import { ContadorActivos } from '../interfaces/contadorActivos.interfaces';

@Injectable({ providedIn: 'root' })
export class usuarioService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(`${this.baseUrl}/clientes/listar`);
  }

  addUser(user: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.baseUrl}/clientes/guardar`, user);
  }

  bcNombre(name: string): Observable<IDUsuarios[]> {
    return this.http.get<IDUsuarios[]>(
      `${this.baseUrl}/clientes/buscar/${name}`
    );
  }

  getUserId(id: number): Observable<IDUsuarios> {
    return this.http.get<IDUsuarios>(`${this.baseUrl}/clientes/listarId/${id}`);
  }

  updateUser(user: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(
      `${this.baseUrl}/clientes/editar/${user._id}`,
      user
    );
  }

  getAllplanes(): Observable<Planes[]> {
    return this.http.get<Planes[]>(`${this.baseUrl}/planes/listar`);
  }

  getClienteInactivos(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(
      `${this.baseUrl}/clientes/listar/clientesIna`
    );
  }
  // uploadImage(clienteId: string, img: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('clienteId', clienteId);
  //   formData.append('img', img);

  //   const headers = new HttpHeaders({ 'Accept': '*/*' });
  //   return this.http.post(`${this.baseUrl}/clientes/cargarimagen`, formData, { headers, responseType: 'text' });
  // }

  uploadImage(formData: FormData) {
    const headers = new HttpHeaders({ Accept: '*/*' });
    return this.http.post(`${this.baseUrl}/clientes/cargarimagen`, formData, {
      headers,
      responseType: 'text',
    });
  }

  contarClietnesActivos(): Observable<ContadorActivos> {
    return this.http.get<ContadorActivos>(
      `${this.baseUrl}/clientes/contar/clientesAct`
    );
  }
}
