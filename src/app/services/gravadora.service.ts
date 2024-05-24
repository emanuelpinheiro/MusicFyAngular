import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gravadora } from '../models/gravadora.model';

@Injectable({
  providedIn: 'root'
})
export class GravadoraService {
  private baseUrl = 'http://localhost:8080/gravadoras';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Gravadora[]> {
    return this.httpClient.get<Gravadora[]>(this.baseUrl);
  }

  findById(id: string): Observable<Gravadora> {
    return this.httpClient.get<Gravadora>(`${this.baseUrl}/${id}`);
  }

  findByNome(nome: string): Observable<Gravadora[]> {
    return this.httpClient.get<Gravadora[]>(`${this.baseUrl}/nome/${nome}`);
  }

  insert(gravadora: Gravadora): Observable<Gravadora> {
    return this.httpClient.post<Gravadora>(this.baseUrl, gravadora);
  }
  
  update(gravadora: Gravadora): Observable<Gravadora> {
    return this.httpClient.put<Gravadora>(`${this.baseUrl}/${gravadora.id}`, gravadora);
  }

  delete(gravadora: Gravadora): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${gravadora.id}`);
  }

}