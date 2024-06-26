import { Component, OnInit } from '@angular/core';
import { Album } from '../../../models/album.model';
import { AlbumService } from '../../../services/album.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})

export class AlbumListComponent implements OnInit {

    displayedColumns: string[] = ['id', 'nome','anoLancamento','artistaNome','descricao','generoNome','gravadoraNome', 'acao'];
    albums: Album[] = [];

    // variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 2;
    page = 0;
  
    constructor(private albumService: AlbumService) {
  
    }
  
    ngOnInit(): void {
      this.listarAlbuns();
    }

    listarAlbuns(){
      this.albumService.findAll().subscribe(data => {
        this.albums = data;
        console.log("🚀 ~ AlbumListComponent ~ this.albumService.findAll ~ this.albums:", this.albums)
      })
    }

        // Método para paginar os resultados
    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.ngOnInit();
    }


    excluir(album: Album){
        this.albumService.delete(album).subscribe({
          next: () => {
            this.listarAlbuns();
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
    }
  }