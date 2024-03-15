import { Component, OnInit } from '@angular/core';
import { Album } from '../../../models/album.model';
import { AlbumService } from '../../../services/album.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css'
})

export class AlbumListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'nome', 'acao'];
    albums: Album[] = [];
  
    constructor(private albumService: AlbumService) {
  
    }
  
    ngOnInit(): void {
      this.albumService.findAll().subscribe(data => {
        this.albums = data;
      })
    }
  
  }