import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClassificacaoEtariaService } from '../../../services/classificacaoetaria.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ClassificacaoEtaria } from '../../../models/classificacaoetaria.model';

@Component({
    selector: 'app-classificacaoetaria-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './classificacaoetaria-form.component.html',
    styleUrl: './classificacaoetaria-form.component.css'
  })

  export class ClassificacaoEtariaFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private classificacaoetariaService: ClassificacaoEtariaService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const classificacaoetaria: ClassificacaoEtaria = activatedRoute.snapshot.data['classificacaoetaria'];
  
      this.formGroup = formBuilder.group({
        id: [(classificacaoetaria && classificacaoetaria.id) ? classificacaoetaria.id : null],
        faixaEtaria: [(classificacaoetaria && classificacaoetaria.faixaEtaria) ? classificacaoetaria.faixaEtaria : '', Validators.required],
        descricao: [(classificacaoetaria && classificacaoetaria.descricao) ? classificacaoetaria.descricao : '', Validators.required]
      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const classificacaoetaria = this.formGroup.value;
        if (classificacaoetaria.id ==null) {
          this.classificacaoetariaService.insert(classificacaoetaria).subscribe({
            next: (classificacaoetariaCadastrado) => {
              this.router.navigateByUrl('/classificacaoetaria');
            },
            error: (err) => {
              console.log('Erro ao Salvar' + JSON.stringify(err));
            }
          });
        } else {
          this.classificacaoetariaService.update(classificacaoetaria).subscribe({
            next: (classificacaoetariaAlterado) => {
              this.router.navigateByUrl('/classificacaoetaria');
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
        const classificacaoetaria = this.formGroup.value;
        this.classificacaoetariaService.delete(classificacaoetaria).subscribe({
          next: (classificacaoetariaExcluido) => {
            this.router.navigateByUrl('/classificacaoetaria');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  
  }