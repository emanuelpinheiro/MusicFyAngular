import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FaixaService } from '../../../services/faixa.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Faixa } from '../../../models/faixa.model';
import { AlbumService } from '../../../services/album.service';
import { Album } from '../../../models/album.model';
import { MatGridListModule, MatGridTile } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { CompositorService } from '../../../services/compositor.service';
import { Compositor } from '../../../models/compositor.model';
//import { Faixa } from '../../../models/faixa.models';


@Component({
    selector: 'app-faixa-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, MatGridTile,MatSelectModule, RouterModule, MatGridListModule],
    templateUrl: './faixa-form.component.html',
    styleUrl: './faixa-form.component.css'
  })

  export class FaixaFormComponent implements OnInit {

    formGroup: FormGroup;
    listAlbums: Album[] = [];
    listCompositores: Compositor[] = [];
    constructor(private formBuilder: FormBuilder,
      private faixaService: FaixaService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private albumService: AlbumService,
      private compositorService: CompositorService) {
  
      const faixa: Faixa = activatedRoute.snapshot.data['faixa'];
      console.log("🚀 ~ FaixaFormComponent ~ faixa:", faixa)
  
      this.formGroup = formBuilder.group({
        id: [(faixa && faixa.id) ? faixa.id : null],
        nome: [(faixa && faixa.nome) ? faixa.nome : '', Validators.required],
        id_album: [(faixa && faixa.id_album) ? faixa.id_album : '', Validators.required],
        id_compositor: [(faixa && faixa.compositor.id) ? faixa.compositor.id : '', Validators.required]
      });
  
    }
  ngOnInit(): void {
    this.listarAlbuns();
    this.listarCompositores();
  }
  listarCompositores() {
    this.compositorService.findAll().subscribe(data => {
      this.listCompositores = data;
      console.log("🚀 ~ FaixaFormComponent ~ this.albumService.findAll ~  this.listCompositores:",  this.listCompositores)
    })
  }
  listarAlbuns() {
    this.albumService.findAll().subscribe(data => {
      this.listAlbums = data;
      console.log("🚀 ~ FaixaFormComponent ~ this.albumService.findAll ~  this.listAlbums:",  this.listAlbums)
    })
  }
  
    salvar() {
      if (this.formGroup.valid) {
        const faixa = this.formGroup.value;
        if (faixa.id ==null) {
          this.faixaService.insert(faixa).subscribe({
            next: (faixaCadastrado) => {
              this.router.navigateByUrl('/admin/faixas');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.faixaService.update(faixa).subscribe({
            next: (faixaAlterado) => {
              this.router.navigateByUrl('/admin/faixas');
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
        const faixa = this.formGroup.value;
        if (faixa.id != null) {
          this.faixaService.delete(faixa).subscribe({
            next: () => {
              this.router.navigateByUrl('/admin/faixas');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  
  }