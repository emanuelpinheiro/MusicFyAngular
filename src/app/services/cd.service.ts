import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cd } from '../models/cd.model';

@Injectable({
  providedIn: 'root'
})
export class CdService {
  private baseUrl = 'http://localhost:8080/cds';

  constructor(private http: HttpClient) { }

  findAll(pagina: number, tamanhoPagina: number): Observable<Cd[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Cd[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Cd> {
    return this.http.get<Cd>(`${this.baseUrl}/${id}`);
  }

  findByNome(nome: string, pagina: number, tamanhoPagina: number): Observable<Cd[]> {
    const params = {
      page: pagina.toString(),
      pageSize: tamanhoPagina.toString()
    }
    return this.http.get<Cd[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);
    
    return this.http.patch<Cd>(`${this.baseUrl}/image/upload`, formData);
  }

  save(cd: Cd): Observable<Cd> {
    const obj = {
      nome: cd.nome,
      preco: cd.preco
    }
    return this.http.post<Cd>(`${this.baseUrl}`, obj);
  }

  update(cd: Cd): Observable<Cd> {
    const obj = {
      nome: cd.nome,
      preco: cd.preco
    }
    return this.http.put<Cd>(`${this.baseUrl}/${cd.id}`, obj);
  }

  delete(cd: Cd): Observable<any> {
    return this.http.delete<Cd>(`${this.baseUrl}/${cd.id}`);
  }
}
