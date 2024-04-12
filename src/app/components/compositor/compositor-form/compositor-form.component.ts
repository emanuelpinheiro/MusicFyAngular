import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompositorService } from '../../../services/compositor.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Compositor } from '../../../models/compositor.model';

@Component({
    selector: 'app-compositor-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './compositor-form.component.html',
    styleUrl: './compositor-form.component.css'
  })

  export class CompositorFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private compositorService: CompositorService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const compositor: Compositor = activatedRoute.snapshot.data['compositor'];
  
      this.formGroup = formBuilder.group({
        id: [(compositor && compositor.id) ? compositor.id : null],
        nome: [(compositor && compositor.nome) ? compositor.nome : '', Validators.required],
        descricao: [(compositor && compositor.descricao) ? compositor.descricao : '', Validators.required]
      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const compositor = this.formGroup.value;
        if (compositor.id ==null) {
          this.compositorService.insert(compositor).subscribe({
            next: (compositorCadastrado) => {
              this.router.navigateByUrl('/compositores');
            },
            error: (err) => {
              console.log('Erro ao Salvar' + JSON.stringify(err));
            }
          });
        } else {
          this.compositorService.update(compositor).subscribe({
            next: (compositorAlterado) => {
              this.router.navigateByUrl('/compositores');
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
        const compositor = this.formGroup.value;
        this.compositorService.delete(compositor).subscribe({
          next: () => {
            this.router.navigateByUrl('/compositores');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  
  }