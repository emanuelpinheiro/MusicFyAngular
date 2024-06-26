import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'http://localhost:8080/albuns';

  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Album[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Album[]>(`${this.baseUrl}`, {params});
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Album> {
    return this.httpClient.get<Album>(`${this.baseUrl}/${id}`);
  }

  insert(album: Album): Observable<Album> {
    return this.httpClient.post<Album>(this.baseUrl, album);
  }
  
  update(album: Album): Observable<Album> {
    return this.httpClient.put<Album>(`${this.baseUrl}/${album.id}`, album);
  }

  delete(album: Album): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${album.id}`);
  }

  getUrlImagem(nomeImagem: string): string {
    return `${this.baseUrl}/image/download/${nomeImagem}`;
  }

  uploadImagem(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);
    
    return this.httpClient.patch<Album>(`${this.baseUrl}/image/upload`, formData);
  }

}
