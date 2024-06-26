import { Component, OnInit } from '@angular/core';
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
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {Artista} from '../../../models/artista.models';
import { ArtistaService } from '../../../services/artista.service';
import { GravadoraService } from '../../../services/gravadora.service';
import { Gravadora } from '../../../models/gravadora.model';
import { GeneroService } from '../../../services/genero.service';
import { Genero } from '../../../models/genero.model';
import {MatGridListModule} from '@angular/material/grid-list';
import { CdService } from '../../../services/cd.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface Produto {
  id: number;
  nome: string;
}

@Component({
    selector: 'app-album-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule, MatSelectModule, FormsModule, MatGridListModule, MatIconModule],
    templateUrl: './album-form.component.html',
    styleUrl: './album-form.component.css'
  })

  export class AlbumFormComponent implements OnInit{

    produtos: Produto[] = [
      {id: 0, nome: 'CD'},
      {id: 1, nome: 'DVD'}
    ];

    fileName: string = '';
    selectedFile: File | null = null; 
    imagePreview: string | ArrayBuffer | null = null;

    listArtistas: Artista[] = [];
    listGravadoras: Gravadora[] = [];
    listGeneros: Genero[] = [];

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private albumService: AlbumService,
      private cdService: CdService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private artistaService: ArtistaService,
      private gravadoraService: GravadoraService,
      private generoService: GeneroService,
      private location: Location) {
  
      const album: Album = activatedRoute.snapshot.data['album'];
  
      console.log(album);
      this.formGroup = formBuilder.group({
        id: [(album && album.id) ? album.id : null],
        nome: [(album && album.nome) ? album.nome : '', Validators.required],
        anoLancamento: [(album && album.anoLancamento) ? album.anoLancamento : ''],
        descricao: [(album && album.descricao) ? album.descricao : ''],
        preco: [(album && album.preco) ? album.preco : ''],
        estoque: [(album && album.estoque) ? album.estoque : ''],
        nomeImagem: [(album && album.nomeImagem) ? album.nomeImagem : ''],
        id_artista: [(album && album.artista.id) ? album.artista.id : ''],
        id_genero: [(album && album.genero.id) ? album.genero.id : ''],
        id_gravadora: [(album && album.gravadora.id) ? album.gravadora.id : ''],
        produto: [(album && album.tipoProduto) ? album.tipoProduto : ''],

      });
  
    }
    voltarPagina() {
      this.location.back();
    }

    ngOnInit(): void {
      this.getAllArtistas();
      this.getAllGravadora();
      this.getAllGenero();
    }

    getAllArtistas(){
      this.artistaService.findAll().subscribe(data => {
        this.listArtistas = data;
      })
    }
    getAllGravadora(){
      this.gravadoraService.findAll().subscribe(data => {
        this.listGravadoras = data;
      })
    }
    getAllGenero(){
      this.generoService.findAll().subscribe(data => {
        this.listGeneros = data;
      })
    }

  
    salvar() {
      if (this.formGroup.valid) {
        const album = this.formGroup.value;
        if (album.id ==null) {
          this.albumService.insert(album).subscribe({
            next: (albumCadastrado) => {
              this.router.navigateByUrl('/admin/albuns');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.albumService.update(album).subscribe({
            next: (albumAlterado) => {
              this.router.navigateByUrl('/admin/albuns');
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
              this.router.navigateByUrl('/admin/albuns');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }

    carregarImagemSelecionada(event: any) {
      this.selectedFile = event.target.files[0];
  
      if (this.selectedFile) {
        this.fileName = this.selectedFile.name;
        // carregando image preview
        const reader = new FileReader();
        reader.onload = e => this.imagePreview = reader.result;
        reader.readAsDataURL(this.selectedFile);
      }
  
    }
  
    private uploadImage(cdId: number) {
      if (this.selectedFile) {
        this.albumService.uploadImagem(cdId, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            this.voltarPagina();
          },
          error: err => {
            console.log('Erro ao fazer o upload da imagem');
            // tratar o erro
          }
        })
      } else {
        this.voltarPagina();
      }
    }
  
  }