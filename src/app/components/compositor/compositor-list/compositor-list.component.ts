import { Component, OnInit } from '@angular/core';
import { Compositor } from '../../../models/compositor.model';
import { CompositorService } from '../../../services/compositor.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-compositor-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './compositor-list.component.html',
  styleUrl: './compositor-list.component.css'
})

export class CompositorListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'descricao', 'acao'];
    compositores: Compositor[] = [];

    // variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private compositorService: CompositorService) {
  
    }
  
    ngOnInit(): void {
      this.listarCompositor();

    }

    listarCompositor(){
      this.compositorService.findAll(this.page, this.pageSize).subscribe(data => {
      this.compositores = data;
      console.log(this.compositores);
    });

    this.compositorService.count().subscribe(data => {
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

    
    excluir(compositor: Compositor) {
      if (compositor.id != null) {
        this.compositorService.delete(compositor).subscribe({
          next: () => {
            this.listarCompositor();
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
    }
  }

  }