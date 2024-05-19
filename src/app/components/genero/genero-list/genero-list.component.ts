import { Component, OnInit } from '@angular/core';
import { Genero } from '../../../models/genero.model';
import { GeneroService } from '../../../services/genero.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-genero-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './genero-list.component.html',
  styleUrl: './genero-list.component.css'
})
export class GeneroListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'nome', 'acao'];
  listGeneros: Genero[] = [];

  constructor(private generoService: GeneroService) {
  
  }

  ngOnInit(): void {
    this.getAllGeneros();
  }

  getAllGeneros(){
    this.generoService.findAll().subscribe(data => {
      this.listGeneros = data;
    })
  }

  excluir(genero: Genero) {
      if (genero != null) {
        this.generoService.delete(genero).subscribe({
          next: () => {
            this.getAllGeneros();
          },
          error: (err:any) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
  
  }


}
