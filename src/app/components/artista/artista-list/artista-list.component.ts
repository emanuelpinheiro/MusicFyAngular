import { Component, OnInit } from '@angular/core';
//import { Artista } from '../../../models/artista.model';
import { ArtistaService } from '../../../services/artista.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Artista } from '../../../models/artista.models';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-artista-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule ],
  templateUrl: './artista-list.component.html',
  styleUrl: './artista-list.component.css'
})

export class ArtistaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    listArtistas: Artista[] = [];

    // variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 10;
    page = 0;
  
    constructor(private artistaService: ArtistaService) {
  
    }
  
    ngOnInit(): void {
      this.artistaService.findAll(this.page, this.pageSize).subscribe(data => {
        this.listArtistas = data;
        console.log(this.listArtistas);
      });
  
      this.artistaService.count().subscribe(data => {
        this.totalRecords = data;
        console.log(this.totalRecords);
      });
    }
    // Método para paginar os resultados
    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.ngOnInit();
    }
  
  }