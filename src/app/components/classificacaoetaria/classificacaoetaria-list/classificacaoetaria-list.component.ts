import { Component, OnInit } from '@angular/core';
import { ClassificacaoEtaria } from '../../../models/classificacaoetaria.model';
import { ClassificacaoEtariaService } from '../../../services/classificacaoetaria.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-classificacaoetaria-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './classificacaoetaria-list.component.html',
  styleUrl: './classificacaoetaria-list.component.css'
})

export class ClassificacaoEtariaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'faixaEtaria', 'descricao', 'acao'];
    classificacaoetarias: ClassificacaoEtaria[] = [];

    constructor(private classificacaoetariaService: ClassificacaoEtariaService) {
  
    }
  
    ngOnInit(): void {
      this.classificacaoetariaService.findAll().subscribe(data => {
        this.classificacaoetarias = data;
      })
    }
  
  }