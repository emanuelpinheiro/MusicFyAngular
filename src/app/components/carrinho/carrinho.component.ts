import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { PedidosService } from '../../services/pedidos.service';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, NgIf, MatButton],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  carrinhoItens: ItemCarrinho[] = [];

  constructor(private carrinhoService: CarrinhoService,
              private pedidoService: PedidosService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe( itens => {
      this.carrinhoItens = itens;
      console.log("🚀 ~ CarrinhoComponent ~ ngOnInit ~ this.carrinhoItens:", this.carrinhoItens)
    })
  }

  removerItem(item: ItemCarrinho): void {
    this.carrinhoService.remover(item);
  }
  
  finalizarCompra(): void {

    console.log(this.carrinhoItens);
    const itensFormatados = this.carrinhoItens.map(a => ({
      quantidade: a.quantidade,
      preco: a.preco,
      idProduto: a.id
    }));
  
    const body: Pedido = {
      pagamento: 1,
      itens: itensFormatados,
    }
    console.log(body);

      this.pedidoService.insert(body).subscribe({
        next: (gravadoraCadastrado) => {
          this.router.navigateByUrl('/loja/minhas-compras');
        },
        error: (err) => {
          console.log('Erro ao Salvar' + JSON.stringify(err));
        }
      });

  }

  


  calcularTotal(): number {
    return 1;
  }

}