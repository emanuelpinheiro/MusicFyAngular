import { NgFor } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { CdService } from '../../../services/cd.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Cd = {
  id: number;
  nome: string;
  preco: number;
  nomeImagem: string;
}

@Component({
  selector: 'app-cd-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton],
  templateUrl: './cd-card-list.component.html',
  styleUrl: './cd-card-list.component.css'
})
export class CdCardListComponent implements OnInit{

  cards = signal<Cd[]> ([]);
  cds: Cd[] = [];

  constructor(private cdService: CdService, 
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar) {} 

  ngOnInit(): void {
    this.carregarCds();
  }

  carregarCds() {
    // buscando todos os cds
    this.cdService.findAll(0, 10).subscribe(data => {
      this.cds = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Cd[] = [];
    this.cds.forEach(cd => {
      cards.push({
        id: cd.id,
        nome: cd.nome,
        preco: cd.preco,
        nomeImagem: cd.nomeImagem
      });
    });
    this.cards.set(cards);
  }

  adicionarAoCarrinho(card: Cd) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.id,
      nome: card.nome,
      preco: card.preco,
      quantidade: 1
    });
  }

  showSnackbarTopPosition(content:any, action:any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: "center"
    });
  }
}
