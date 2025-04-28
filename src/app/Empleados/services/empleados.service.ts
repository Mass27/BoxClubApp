import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { EmpleadoByID } from '../interfaces/EmpleadoById.interfaces';

import { Empleados2 } from '../interfaces/empleados2.interfaces';

@Injectable({ providedIn: 'root' })
export class EmpleadosService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllEmpleados(): Observable<Empleados2[]> {
    return this.httpClient.get<Empleados2[]>(
      `${this.baseUrl}/empleados/listar`
    );
  }

  addImg(imagen: string) {
    const formData = new FormData();
    formData.append('img', imagen);

    return this.httpClient.post(
      `${this.baseUrl}/empleados/cargarimagen`,
      formData
    );
  }

  addEmpleados(empleado: Empleados2): Observable<Empleados2> {
    return this.httpClient.post<Empleados2>(
      `${this.baseUrl}/empleados/guardar`,
      empleado
    );
  }

  getEmpleadoById(id: number): Observable<EmpleadoByID> {
    return this.httpClient.get<EmpleadoByID>(
      `${this.baseUrl}/empleados/buscar/${id}`
    );
  }

  buscarEmpleado(id: number): Observable<EmpleadoByID> {
    return this.httpClient.get<EmpleadoByID>(
      `${this.baseUrl}/empleados/buscar/${id}`
    );
  }

  buscarEmpleadosPorNombre(nombre: string): Observable<EmpleadoByID[]> {
    return this.httpClient.get<EmpleadoByID[]>(
      `${this.baseUrl}/empleados/buscarnombre/${nombre}`
    );
  }

  updateEmpleado(empleado: Empleados2): Observable<EmpleadoByID> {
    return this.httpClient.put<EmpleadoByID>(
      `${this.baseUrl}/empleados/editar/${empleado.idempleado}`,
      empleado
    );
  }

  uploadImage(idEmpleado: number, imageFile: File) {
    const formData = new FormData();
    formData.append('idempleado', idEmpleado.toString());
    formData.append('img', imageFile);

    const headers = new HttpHeaders({ Accept: '*/*' });
    // Puedes omitir el encabezado "Accept" si no es necesario.

    return this.httpClient.post(
      `${this.baseUrl}/empleados/cargarimagen`,
      formData,
      { headers, responseType: 'text' }
    );
  }
}
