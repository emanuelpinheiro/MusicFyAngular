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

  findAll(): Observable<Album[]> {
    return this.httpClient.get<Album[]>(this.baseUrl);
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

}
