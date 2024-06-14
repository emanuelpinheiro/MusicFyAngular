import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrl = 'http://localhost:8080/pedidos';
  constructor(private httpClient: HttpClient) {  }

  findAll(page?: number, pageSize?: number): Observable<Pedido[]> {
    // variavel de escopo de bloco
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Pedido[]>(`${this.baseUrl}/buscar`, {params});
  }

  findById(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(`${this.baseUrl}/buscar/meuspedidos/${id}`);
  }

  insert(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(`${this.baseUrl}/fazer-pedido`, pedido);
  }
}
