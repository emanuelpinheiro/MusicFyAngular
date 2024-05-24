import { Component, OnInit } from '@angular/core';
import { Compositor } from '../../../models/compositor.model';
import { CompositorService } from '../../../services/compositor.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-compositor-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './compositor-list.component.html',
  styleUrl: './compositor-list.component.css'
})

export class CompositorListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'descricao', 'acao'];
    compositores: Compositor[] = [];

    constructor(private compositorService: CompositorService) {
  
    }
  
    ngOnInit(): void {
      this.compositorService.findAll().subscribe(data => {
        this.compositores = data;
      })
    }
  
  }