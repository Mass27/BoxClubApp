import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Planes } from '../interfaces/planes.interface';
import { Observable } from 'rxjs';
import { PlanesByID } from '../interfaces/planesById.interfaces';

@Injectable({
  providedIn: 'root',
})
export class PlanesService {
  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  getAllplanes(): Observable<Planes[]> {
    return this.httpClient.get<Planes[]>(`${this.baseUrl}/planes/listar`);
  }

  postPlanes(planes: Planes): Observable<Planes> {
    return this.httpClient.post<Planes>(
      `${this.baseUrl}/planes/guardar`,
      planes
    );
  }
  updateProducto(planes: Planes): Observable<Planes> {
    return this.httpClient.put<Planes>(
      `${this.baseUrl}/planes/editar/${planes._id}`,
      planes
    );
  }
  getPlanesById(id: number): Observable<Planes> {
    return this.httpClient.get<Planes>(`${this.baseUrl}/planes/buscar/${id}`);
  }

  getPlanesBuscarNombre(name: string): Observable<PlanesByID[]> {
    return this.httpClient.get<PlanesByID[]>(
      `${this.baseUrl}/planes/buscarnombre/${name}`
    );
  }
}
