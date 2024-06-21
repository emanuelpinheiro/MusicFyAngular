import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { CdService } from '../../../services/cd.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cd } from '../../../models/cd.model';
import { AlbumService } from '../../../services/album.service';
import { Album } from '../../../models/album.model';
import { Artista } from '../../../models/artista.models';
import { Faixa } from '../../../models/faixa.model';
import { Genero } from '../../../models/genero.model';
import { Gravadora } from '../../../models/gravadora.model';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../../details-dialog/details-dialog.component';

// tipo personalizado de dados, como classes e interfaces, porém mais simples.
type Card = {
  idAlbum: number;
  nome: string;
  anoLancamento: string;
  artista: Artista;
  estoque: number;
  faixas: Faixa;
  genero: Genero;
  gravadora: Gravadora;
  preco: number;
  urlImagem: string;
}


@Component({
  selector: 'app-cd-card-list',
  standalone: true,
  imports: [MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor,NgIf, MatButton],
  templateUrl: './cd-card-list.component.html',
  styleUrl: './cd-card-list.component.css'
})
export class CdCardListComponent implements OnInit{

  cards = signal<Card[]> ([]);
  albums: Album[] = [];

  constructor(private albumService: AlbumService, 
              private carrinhoService: CarrinhoService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {} 

  ngOnInit(): void {
    this.carregarAlbums();
  }

  carregarAlbums() {
    // buscando todos os cds
    this.albumService.findAll(0, 10).subscribe(data => {
      this.albums = data;
      console.log("🚀 ~ CdCardListComponent ~ this.albumService.findAll ~ this.albums:", this.albums)
      this.carregarCards();
    });
  }

  carregarCards() {
    const cards: Card[] = [];
    this.albums.forEach(albm => {
      cards.push({
        idAlbum: albm.id,
        nome: albm.nome,
        anoLancamento: albm.anoLancamento,
        artista: albm.artista,
        estoque: albm.estoque,
        faixas: albm.faixas,
        genero: albm.genero,
        gravadora: albm.gravadora,
        preco: albm.preco,
        urlImagem: this.albumService.getUrlImagem(albm.nomeImagem)
      });
    });
    this.cards.set(cards);
  }  

  adicionarAoCarrinho(card: Card) {
    console.log("🚀 ~ CdCardListComponent ~ adicionarAoCarrinho ~ card:", card.urlImagem)
    this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
    this.carrinhoService.adicionar({
      id: card.idAlbum,
      nome: card.nome,
      nomeImagem: card.urlImagem,
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

  verMais(card: Card){
    console.log("🚀 ~ CdCardListComponent ~ verMais ~ card:", card)
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      width: '35%',
      height: '450px',
      data: card
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
