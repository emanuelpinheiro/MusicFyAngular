import { NgFor } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { CdService } from '../../../services/cd.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from '../../../models/cd.model';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idCd: number;
  nome: string;
  preco: number;
  urlImagem: string;
}


@Component({
  selector: 'app-cd-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, MatButton],
  templateUrl: './cd-card-list.component.html',
  styleUrl: './cd-card-list.component.css'
})
export class CdCardListComponent implements OnInit{

  cards = signal<Card[]> ([]);
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
      console.log("🚀 ~ CdCardListComponent ~ this.cdService.findAll ~ this.cds:", this.cds)
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.cds.forEach(cd => {
      cards.push({
        idCd: cd.id,
        nome: cd.nome,
        preco: cd.preco,
        urlImagem: cd.nomeImagem
      });
    });
    this.cards.set(cards);
  }  

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idCd,
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
