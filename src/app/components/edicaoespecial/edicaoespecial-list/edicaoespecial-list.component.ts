import { Component, OnInit } from '@angular/core';
import { EdicaoEspecial } from '../../../models/edicaoespecial.model';
import { EdicaoEspecialService } from '../../../services/edicaoespecial.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-edicaoespecial-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './edicaoespecial-list.component.html',
  styleUrl: './edicaoespecial-list.component.css'
})

export class EdicaoEspecialListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome','albumNome', 'acao'];
    edicaoespecial: EdicaoEspecial[] = [];

    // variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 2;
    page = 0;

    constructor(private edicaoespecialService: EdicaoEspecialService) {
  
    }
  
    ngOnInit(): void {
      this.listEdicoesEspeciais();
    }

    // Método para paginar os resultados
    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.ngOnInit();
      }


      excluir(edicao: EdicaoEspecial) {
        if (edicao.id != null) {
          this.edicaoespecialService.delete(edicao).subscribe({
            next: () => {
              this.listEdicoesEspeciais();
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
      }
    }

    listEdicoesEspeciais(){
      this.edicaoespecialService.findAll().subscribe(data => {
        this.edicaoespecial = data;
        console.log("🚀 ~ EdicaoEspecialListComponent ~ this.edicaoespecialService.findAll ~ this.edicaoespecial:", this.edicaoespecial)
      })
    }

  
  }