import { Component, OnInit } from '@angular/core';
//import { Faixa } from '../../../models/faixa.model';
import { FaixaService } from '../../../services/faixa.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Faixa } from '../../../models/faixa.model';
//import { Faixa } from '../../../models/faixa.models';

@Component({
  selector: 'app-faixa-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './faixa-list.component.html',
  styleUrl: './faixa-list.component.css'
})

export class FaixaListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    listFaixas: Faixa[] = [];
  
    constructor(private faixaService: FaixaService) {
  
    }
  
    async ngOnInit(): Promise<void> {
      await this.getAllFaixas();
    }

    async getAllFaixas(){
      this.faixaService.findAll().subscribe(data => {
        this.listFaixas = data;
        console.log(this.listFaixas)
      })
    }
  
  }