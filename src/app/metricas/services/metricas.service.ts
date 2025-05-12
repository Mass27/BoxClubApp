import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Metricas } from '../interfaces/metricas.interfaces';
import { MetricasID } from '../interfaces/metricasId.interfaces';
import { ClienteMet } from '../interfaces/clienteMet.interfaces';

@Injectable({ providedIn: 'root' })
export class MetricasService {
    private baseUrl = environment.apiUrl;
    constructor(private HttpClient:HttpClient) {}




    listar(): Observable<Metricas[]> {
      return this.HttpClient.get<Metricas[]>(`${this.baseUrl}/metricas/listar`);
    }

    guardar(data: Metricas): Observable<Metricas> {
      return this.HttpClient.post<Metricas>(`${this.baseUrl}/metricas/guardar`, data);
    }

    obtenerPorId(id: string): Observable<MetricasID> {
      return this.HttpClient.get<MetricasID>(`${this.baseUrl}/metricas/buscar/${id}`);
    }

updateRutinas(rutina: Metricas): Observable<MetricasID> {
  return this.HttpClient.put<MetricasID>(`${this.baseUrl}/metricas/editar/${rutina._id}`, rutina);}

getMetricasPorCliente(id: string): Observable<ClienteMet[]> {
      return this.HttpClient.get<ClienteMet[]>(`${this.baseUrl}/metricas/cliente/${id}`);
    }
}
