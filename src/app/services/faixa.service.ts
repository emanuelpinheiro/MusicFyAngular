import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faixa } from '../models/faixa.model';

@Injectable({
  providedIn: 'root'
})
export class FaixaService {
  private baseUrl = 'http://localhost:8080/faixas';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Faixa[]> {
    return this.httpClient.get<Faixa[]>(this.baseUrl);
  }

  findById(id: string): Observable<Faixa> {
    return this.httpClient.get<Faixa>(`${this.baseUrl}/${id}`);
  }

  insert(faixa: Faixa): Observable<Faixa> {
    return this.httpClient.post<Faixa>(this.baseUrl, faixa);
  }
  
  update(faixa: Faixa): Observable<Faixa> {
    return this.httpClient.put<Faixa>(`${this.baseUrl}/${faixa.id}`, faixa);
  }

  delete(faixa: Faixa): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${faixa.id}`);
  }

}
