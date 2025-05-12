import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Metricas } from '../interfaces/metricas.interfaces';

@Injectable({ providedIn: 'root' })
export class MetricasService {
    private baseUrl = environment.apiUrl;
    constructor(private HttpClient:HttpClient) {}




    listar(): Observable<Metricas[]> {
      return this.HttpClient.get<Metricas[]>(`${this.baseUrl}/metricas/listar`);
    }
  
    guardar(data: any): Observable<any> {
      return this.HttpClient.post(`${this.baseUrl}/guardar`, data);
    }
  
    obtenerPorId(id: string): Observable<any> {
      return this.HttpClient.get(`${this.baseUrl}/buscar/${id}`);
    }


}
