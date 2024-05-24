import { Component } from '@angular/core';
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
//import { Faixa } from '../../../models/faixa.models';


@Component({
    selector: 'app-faixa-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './faixa-form.component.html',
    styleUrl: './faixa-form.component.css'
  })

  export class FaixaFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private faixaService: FaixaService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const faixa: Faixa = activatedRoute.snapshot.data['faixa'];
  
      this.formGroup = formBuilder.group({
        id: [(faixa && faixa.id) ? faixa.id : null],
        nome: [(faixa && faixa.nome) ? faixa.nome : '', Validators.required]
      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const faixa = this.formGroup.value;
        if (faixa.id ==null) {
          this.faixaService.insert(faixa).subscribe({
            next: (faixaCadastrado) => {
              this.router.navigateByUrl('/faixas');
            },
            error: (err) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.faixaService.update(faixa).subscribe({
            next: (faixaAlterado) => {
              this.router.navigateByUrl('/faixas');
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
              this.router.navigateByUrl('/faixas');
            },
            error: (err) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
  
  }