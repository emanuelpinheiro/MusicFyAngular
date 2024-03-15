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

@Component({
  selector: 'app-artista-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './artista-list.component.html',
  styleUrl: './artista-list.component.css'
})

export class ArtistaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'descicao', 'acao'];
    artistas: Artista[] = [];
  
    constructor(private artistaService: ArtistaService) {
  
    }
  
    ngOnInit(): void {
      this.artistaService.findAll().subscribe(data => {
        this.artistas = data;
      })
    }
  
  }