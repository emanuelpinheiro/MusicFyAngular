import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  private readonly viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  buscarCep(cep: string): Observable<any> {
    return this.http.get<any>(`${this.viaCepUrl}/${cep}/json`);
  }
}
