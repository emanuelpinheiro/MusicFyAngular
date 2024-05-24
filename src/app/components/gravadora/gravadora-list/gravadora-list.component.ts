import { Component, OnInit } from '@angular/core';
import { Gravadora } from '../../../models/gravadora.model';
import { GravadoraService } from '../../../services/gravadora.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gravadora-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './gravadora-list.component.html',
  styleUrl: './gravadora-list.component.css'
})

export class GravadoraListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    gravadoras: Gravadora[] = [];
  
    constructor(private gravadoraService: GravadoraService) {
  
    }
  
    ngOnInit(): void {
      this.gravadoraService.findAll().subscribe(data => {
        this.gravadoras = data;
      })
    }
  
  }