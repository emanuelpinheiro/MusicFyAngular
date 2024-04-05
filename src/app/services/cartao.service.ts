import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartaoCredito } from '../models/cartao.model';

@Injectable({
  providedIn: 'root'
})

export class CartaoService {
  private baseUrl = 'http://localhost:8080/cartao';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<CartaoCredito[]> {
    return this.httpClient.get<CartaoCredito[]>(this.baseUrl);
  }

  findById(id: string): Observable<CartaoCredito> {
    return this.httpClient.get<CartaoCredito>(`${this.baseUrl}/${id}`);
  }

  insert(cartao: CartaoCredito): Observable<CartaoCredito> {
    return this.httpClient.post<CartaoCredito>(this.baseUrl, cartao);
  }

  update(cartao: CartaoCredito): Observable<CartaoCredito> {
    return this.httpClient.put<CartaoCredito>(`${this.baseUrl}/${cartao.id}`, cartao);
  }

  delete(cartao: CartaoCredito): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${cartao.id}`);
  }

}