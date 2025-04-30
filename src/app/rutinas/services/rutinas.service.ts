import { Rutinas } from './../interfaces/rutinas.interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RutinasID } from '../interfaces/rutinasId.interfaces';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {
  private baseUrl = environment.apiUrl;

constructor(private HttpClient:HttpClient) {






}


getRutinaById(id: string): Observable<RutinasID> {
  return this.HttpClient.get<RutinasID>(`${this.baseUrl}/rutinas/obtener/${id}`);
}


getAllRutinas(): Observable<Rutinas[]> {
  return this.HttpClient.get<Rutinas[]>(`${this.baseUrl}/rutinas/listar`);}

searchByName(name: string): Observable<RutinasID[]> {

  return this.HttpClient.get<RutinasID[]>(`${this.baseUrl}/rutinas/buscar/${name}`);
}


addRutinas(rutina: Rutinas): Observable<Rutinas> {
  return this.HttpClient.post<Rutinas>(`${this.baseUrl}/rutinas/guardar`, rutina);
}

updateRutinas(rutina: Rutinas): Observable<RutinasID> {
  return this.HttpClient.put<RutinasID>(`${this.baseUrl}/rutinas/editar/${rutina._id}`, rutina);}
}
