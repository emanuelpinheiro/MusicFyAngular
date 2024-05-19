import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Artista } from '../models/artista.models';
//import { Artista } from '../models/artista.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {
  private baseUrl = 'http://localhost:8080/artistas';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Artista[]> {
    return this.httpClient.get<Artista[]>(this.baseUrl);
  }

  findById(id: string): Observable<Artista> {
    return this.httpClient.get<Artista>(`${this.baseUrl}/${id}`);
  }

  insert(artista: Artista): Observable<Artista> {
    return this.httpClient.post<Artista>(this.baseUrl, artista);
  }
  
  update(artista: Artista): Observable<Artista> {
    return this.httpClient.put<Artista>(`${this.baseUrl}/${artista.id}`, artista);
  }

  delete(artista: Artista): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${artista.id}`);
  }

}
