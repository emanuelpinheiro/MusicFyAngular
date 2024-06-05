import { Component, OnInit } from '@angular/core';
import { ClassificacaoEtaria } from '../../../models/classificacaoetaria.model';
import { ClassificacaoEtariaService } from '../../../services/classificacaoetaria.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-classificacaoetaria-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './classificacaoetaria-list.component.html',
  styleUrl: './classificacaoetaria-list.component.css'
})

export class ClassificacaoEtariaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'faixaEtaria', 'descricao', 'acao'];
    classificacaoetarias: ClassificacaoEtaria[] = [];

    // variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private classificacaoetariaService: ClassificacaoEtariaService) {
  
    }
  
    ngOnInit(): void {
      this.classificacaoetariaService.findAll().subscribe(data => {
        this.classificacaoetarias = data;
      })
    }
 
    // Método para paginar os resultados
    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.ngOnInit();
      }    
  
  }