import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EdicaoEspecialService } from '../../../services/edicaoespecial.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EdicaoEspecial } from '../../../models/edicaoespecial.model';
import { AlbumService } from '../../../services/album.service';
import { Album } from '../../../models/album.model';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-edicaoespecial-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatGridTile,MatSelectModule, RouterModule, MatGridListModule],
    templateUrl: './edicaoespecial-form.component.html',
    styleUrl: './edicaoespecial-form.component.css'
  })

  export class EdicaoEspecialFormComponent implements OnInit{

    formGroup: FormGroup;
    listAlbums: Album[] = [];
    listEdicioes: EdicaoEspecial[] = [];
  
    constructor(private formBuilder: FormBuilder,
      private edicaoespecialService: EdicaoEspecialService,
      private router: Router,
      private albumService: AlbumService,
      private activatedRoute: ActivatedRoute) {
  
      const edicaoespecial: EdicaoEspecial = activatedRoute.snapshot.data['edicaoespecial'];
  
      this.formGroup = formBuilder.group({
        id: [(edicaoespecial && edicaoespecial.id) ? edicaoespecial.id : null],
        nome: [(edicaoespecial && edicaoespecial.nome) ? edicaoespecial.nome : '', Validators.required],
        id_album: [(edicaoespecial && edicaoespecial.album.id) ? edicaoespecial.album.id : '', Validators.required]

      });
  
    }
  ngOnInit(): void {
    this.listarAlbuns();
  }
  
    salvar() {
      if (this.formGroup.valid) {
        const edicaoespecial = this.formGroup.value;
        if (edicaoespecial.id ==null) {
          this.edicaoespecialService.insert(edicaoespecial).subscribe({
            next: (edicaoespecialCadastrado) => {
              this.router.navigateByUrl('/admin/edicaoespecial');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.edicaoespecialService.update(edicaoespecial).subscribe({
            next: (edicaoespecialAlterado) => {
              this.router.navigateByUrl('/admin/edicaoespecial');
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
          const edicaoespecial = this.formGroup.value;
          if (edicaoespecial.id != null) {
            this.edicaoespecialService.delete(edicaoespecial).subscribe({
              next: () => {
                this.router.navigateByUrl('/admin/edicaoespecial');
              },
              error: (err) => {
                console.log('Erro ao Excluir' + JSON.stringify(err));
              }
            });
          }
        }
    }

    listarAlbuns() {
      this.albumService.findAll().subscribe(data => {
        this.listAlbums = data;
        console.log("🚀 ~ FaixaFormComponent ~ this.albumService.findAll ~  this.listAlbums:",  this.listAlbums)
      })
    }

  }
