import { Component } from '@angular/core';
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

@Component({
    selector: 'app-edicaoespecial-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './edicaoespecial-form.component.html',
    styleUrl: './edicaoespecial-form.component.css'
  })

  export class EdicaoEspecialFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private edicaoespecialService: EdicaoEspecialService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const edicaoespecial: EdicaoEspecial = activatedRoute.snapshot.data['edicaoespecial'];
  
      this.formGroup = formBuilder.group({
        id: [(edicaoespecial && edicaoespecial.id) ? edicaoespecial.id : null],
        descricao: [(edicaoespecial && edicaoespecial.descricao) ? edicaoespecial.descricao : '', Validators.required],
        conteudoAdicional: [(edicaoespecial && edicaoespecial.conteudoAdicional) ? edicaoespecial.conteudoAdicional : '', Validators.required],
        precoExtra: [(edicaoespecial && edicaoespecial.precoExtra) ? edicaoespecial.precoExtra : '', Validators.required]

      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const edicaoespecial = this.formGroup.value;
        if (edicaoespecial.id ==null) {
          this.edicaoespecialService.insert(edicaoespecial).subscribe({
            next: (edicaoespecialCadastrado) => {
              this.router.navigateByUrl('/edicaoespecial');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.edicaoespecialService.update(edicaoespecial).subscribe({
            next: (edicaoespecialAlterado) => {
              this.router.navigateByUrl('/edicaoespecial');
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
                this.router.navigateByUrl('/gravadoras');
              },
              error: (err) => {
                console.log('Erro ao Excluir' + JSON.stringify(err));
              }
            });
          }
        }
    }
  }
