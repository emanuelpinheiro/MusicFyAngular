import { Component, OnInit } from '@angular/core';
import { Gravadora } from '../../../models/gravadora.model';
import { GravadoraService } from '../../../services/gravadora.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-gravadora-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './gravadora-list.component.html',
  styleUrl: './gravadora-list.component.css'
})

export class GravadoraListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    gravadoras: Gravadora[] = [];
    
    // variaveis de controle de paginacao
    totalRecords = 0;
    pageSize = 2;
    page = 0;
  
    constructor(private gravadoraService: GravadoraService) {
  
    }
  
    ngOnInit(): void {
      this.listarGravadoras();
    }
    
    // Método para paginar os resultados
    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.ngOnInit();
      }

    excluir(gravadora: Gravadora) {
        if (gravadora.id != null) {
          this.gravadoraService.delete(gravadora).subscribe({
            next: () => {
              this.listarGravadoras();
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
    }

    listarGravadoras() {
      this.gravadoraService.findAll().subscribe(data => {
        this.gravadoras = data;
      })
    }

  
  }