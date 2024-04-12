import { Component, OnInit } from '@angular/core';
import { Genero } from '../../../models/genero.model';
import { GeneroService } from '../../../services/genero.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule, MatPaginatorModule],
  templateUrl: './genero-list.component.html',
  styleUrl: './genero-list.component.css'
})
export class GeneroListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nome', 'acao'];
  listGeneros: Genero[] = [];

      // variaveis de controle de paginacao
      totalRecords = 0;
      pageSize = 2;
      page = 0;

  constructor(private generoService: GeneroService) {
  
  }

  ngOnInit(): void {
    this.generoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.listGeneros = data;
      console.log(this.listGeneros);
    });


    this.generoService.count().subscribe(data => {
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
