import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compositor } from '../models/compositor.model';

@Injectable({
  providedIn: 'root'
})
export class CompositorService {
  private baseUrl = 'http://localhost:8080/compositores';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Compositor[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Compositor[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Compositor> {
    return this.httpClient.get<Compositor>(`${this.baseUrl}/${id}`);
  }

  findByNome(nome: string): Observable<Compositor[]> {
    return this.httpClient.get<Compositor[]>(`${this.baseUrl}/nome/${nome}`);
  }

  insert(compositor: Compositor): Observable<Compositor> {
    return this.httpClient.post<Compositor>(this.baseUrl, compositor);
  }
  
  update(compositor: Compositor): Observable<Compositor> {
    return this.httpClient.put<Compositor>(`${this.baseUrl}/${compositor.id}`, compositor);
  }

  delete(compositor: Compositor): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${compositor.id}`);
  }

}
