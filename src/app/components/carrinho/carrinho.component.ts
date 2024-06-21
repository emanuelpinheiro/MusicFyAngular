import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemCarrinho } from '../../models/itemcarrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { PedidosService } from '../../services/pedidos.service';
import { Router } from '@angular/router';
import { Pedido } from '../../models/pedido.model';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CardPaymentDialogComponent } from '../card-payment-dialog/card-payment-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, NgIf, MatButton, MatFormField, FormsModule, MatTabsModule, MatCardModule,MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {

  pagamentos: any[] = [
    {value: 1, viewValue: 'PIX'},
    {value: 2, viewValue: 'Boleto'},
    {value: 3, viewValue: 'Cartão Crédito / Débito'},
  ];

  carrinhoItens: ItemCarrinho[] = [];
  auxiliar: boolean = true;
  cartao: any;

  constructor(private carrinhoService: CarrinhoService,
              private pedidoService: PedidosService,
              private router: Router,
              public dialog: MatDialog
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
      pagamento: 3,
      cartao: this.cartao,
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

  selecionarPagamento(): void {
    const dialogRef = this.dialog.open(CardPaymentDialogComponent, {
      width: '50%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.cartao = result;
      this.auxiliar = false;
      console.log(result);
    });
   
  }

  onSelectionChange(event: MatSelectChange) {
    const selectedValue = event.value;
    if(selectedValue === 3){
      this.selecionarPagamento();
    }
    // Você pode fazer outras operações com o valor selecionado aqui
  }


  calcularTotal(): number {
    return 1;
  }

}