import { Component, OnInit } from '@angular/core';
import { EdicaoEspecial } from '../../../models/edicaoespecial.model';
import { EdicaoEspecialService } from '../../../services/edicaoespecial.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edicaoespecial-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './edicaoespecial-list.component.html',
  styleUrl: './edicaoespecial-list.component.css'
})

export class EdicaoEspecialListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'descricao', 'conteudoAdicional', 'precoExtra', 'acao'];
    edicaoespecial: EdicaoEspecial[] = [];

    constructor(private edicaoespecialService: EdicaoEspecialService) {
  
    }
  
    ngOnInit(): void {
      this.edicaoespecialService.findAll().subscribe(data => {
        this.edicaoespecial = data;
      })
    }
  
  }