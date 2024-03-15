import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlbumService } from '../../../services/album.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Album } from '../../../models/album.model';

@Component({
    selector: 'app-album-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './album-form.component.html',
    styleUrl: './album-form.component.css'
  })

  export class AlbumFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private albumService: AlbumService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const album: Album = activatedRoute.snapshot.data['album'];
  
      this.formGroup = formBuilder.group({
        id: [(album && album.id) ? album.id : null],
        nome: [(album && album.nome) ? album.nome : '', Validators.required]
      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const album = this.formGroup.value;
        if (album.id ==null) {
          this.albumService.insert(album).subscribe({
            next: (albumCadastrado) => {
              this.router.navigateByUrl('/albuns');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.albumService.update(album).subscribe({
            next: (albumAlterado) => {
              this.router.navigateByUrl('/albuns');
            },
            error: (err) => {
              console.log('Erro ao Editar' + JSON.stringify(err));
            }
          });
        }
      }
    }
  
    excluir() {
      if (this.formGroup.valid) {
        const album = this.formGroup.value;
        if (album.id != null) {
          this.albumService.delete(album).subscribe({
            next: () => {
              this.router.navigateByUrl('/albuns');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  
  }