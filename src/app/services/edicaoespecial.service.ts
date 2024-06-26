import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EdicaoEspecial } from '../models/edicaoespecial.model';

@Injectable({
  providedIn: 'root'
})

export class EdicaoEspecialService {
  private baseUrl = 'http://localhost:8080/edicaoespecial';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<EdicaoEspecial[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<EdicaoEspecial[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<EdicaoEspecial> {
    return this.httpClient.get<EdicaoEspecial>(`${this.baseUrl}/${id}`);
  }

  findByDescricao(descricao: string): Observable<EdicaoEspecial[]> {
    return this.httpClient.get<EdicaoEspecial[]>(`${this.baseUrl}/descricao/${descricao}`);
  }

  findByConteudoAdicional(conteudoAdicional: string): Observable<EdicaoEspecial[]> {
    return this.httpClient.get<EdicaoEspecial[]>(`${this.baseUrl}/conteudoAdicional/${conteudoAdicional}`);
  }

  findByPrecoExtra(precoExtra: string): Observable<EdicaoEspecial[]> {
    return this.httpClient.get<EdicaoEspecial[]>(`${this.baseUrl}/precoExtra/${precoExtra}`);
  }
  
  insert(edicaoespecial: EdicaoEspecial): Observable<EdicaoEspecial> {
    return this.httpClient.post<EdicaoEspecial>(this.baseUrl, edicaoespecial);
  }
  
  update(edicaoespecial: EdicaoEspecial): Observable<EdicaoEspecial> {
    return this.httpClient.put<EdicaoEspecial>(`${this.baseUrl}/${edicaoespecial.id}`, edicaoespecial);
  }

  delete(edicaoespecial: EdicaoEspecial): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${edicaoespecial.id}`);
  }

}