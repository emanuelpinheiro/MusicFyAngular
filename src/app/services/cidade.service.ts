import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private baseUrl = 'http://localhost:8080/cidades/search/nome';

  constructor(private httpClient: HttpClient) {  }


  findByName(nome: string): Observable<Cidade> {
    return this.httpClient.get<Cidade>(`${this.baseUrl}/${nome}`);
  }
}
