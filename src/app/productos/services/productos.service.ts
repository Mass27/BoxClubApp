import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Productos } from '../interfaces/productos.interfaces';
import { Observable } from 'rxjs';
import { ProdByID } from '../interfaces/prodById.interfaces';
import { Metricas } from '../interfaces/metrics.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(`${this.baseUrl}/productos/listar`);
  }

  postProductos(producto: Productos): Observable<Productos> {
    return this.http.post<Productos>(
      `${this.baseUrl}/productos/guardar/`,
      producto
    );
  }
  updateProductos(producto: Productos): Observable<Productos> {
    return this.http.put<Productos>(
      `${this.baseUrl}/productos/editar/${producto._id}`,
      producto
    );
  }

  getProdById(id: number): Observable<ProdByID> {
    return this.http.get<ProdByID>(`${this.baseUrl}/productos/buscar/${id}`);
  }

  buscarPorNombre(name: string): Observable<ProdByID[]> {
    return this.http.get<ProdByID[]>(
      `${this.baseUrl}/productos/buscarnombre/${name}`
    );
  }

  uploadImage(formData: FormData) {
    const headers = new HttpHeaders({ Accept: '*/*' });
    return this.http.post(`${this.baseUrl}/productos/cargarimagen`, formData, {
      headers,
      responseType: 'text',
    });
  }
    obtenerMetrics(): Observable<Metricas> {
    return this.http.get<Metricas>(`${this.baseUrl}/productos/metrics`);
  }
}
