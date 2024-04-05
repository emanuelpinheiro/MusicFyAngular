import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassificacaoEtaria } from '../models/classificacaoetaria.model';

@Injectable({
  providedIn: 'root'
})

export class ClassificacaoEtariaService {
  private baseUrl = 'http://localhost:8080/classificacaoetaria';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<ClassificacaoEtaria[]> {
    return this.httpClient.get<ClassificacaoEtaria[]>(this.baseUrl);
  }

  findById(id: string): Observable<ClassificacaoEtaria> {
    return this.httpClient.get<ClassificacaoEtaria>(`${this.baseUrl}/${id}`);
  }

  findByFaixaEtaria(faixaEtaria: string): Observable<ClassificacaoEtaria[]> {
    return this.httpClient.get<ClassificacaoEtaria[]>(`${this.baseUrl}/faixaetaria/${faixaEtaria}`);
  }

  findByDescricao(descricao: string): Observable<ClassificacaoEtaria[]> {
    return this.httpClient.get<ClassificacaoEtaria[]>(`${this.baseUrl}/descricao/${descricao}`);
  }

  insert(classificacaoetaria: ClassificacaoEtaria): Observable<ClassificacaoEtaria> {
    return this.httpClient.post<ClassificacaoEtaria>(this.baseUrl, classificacaoetaria);
  }
  
  update(classificacaoetaria: ClassificacaoEtaria): Observable<ClassificacaoEtaria> {
    return this.httpClient.put<ClassificacaoEtaria>(`${this.baseUrl}/${classificacaoetaria.id}`, classificacaoetaria);
  }

  delete(classificacaoetaria: ClassificacaoEtaria): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${classificacaoetaria.id}`);
  }

}