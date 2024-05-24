import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ArtistaService } from '../../../services/artista.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Artista } from '../../../models/artista.models';


@Component({
    selector: 'app-artista-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './artista-form.component.html',
    styleUrl: './artista-form.component.css'
  })

  export class ArtistaFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private artistaService: ArtistaService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const artista: Artista = activatedRoute.snapshot.data['artista'];
  
      this.formGroup = formBuilder.group({
        id: [(artista && artista.id) ? artista.id : null],
        nome: [(artista && artista.nome) ? artista.nome : '', Validators.required],
        descricao: [(artista && artista.descricao) ? artista.descricao : '', Validators.required]
      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const artista = this.formGroup.value;
        if (artista.id ==null) {
          this.artistaService.insert(artista).subscribe({
            next: (artistaCadastrado) => {
              this.router.navigateByUrl('/artistas');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.artistaService.update(artista).subscribe({
            next: (artistaAlterado) => {
              this.router.navigateByUrl('/artistas');
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
        const artista = this.formGroup.value;
        if (artista.id != null) {
          this.artistaService.delete(artista).subscribe({
            next: () => {
              this.router.navigateByUrl('/artistas');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  
  }