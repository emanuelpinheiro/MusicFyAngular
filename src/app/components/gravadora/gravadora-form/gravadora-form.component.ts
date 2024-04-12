import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GravadoraService } from '../../../services/gravadora.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Gravadora } from '../../../models/gravadora.model';

@Component({
    selector: 'app-gravadora-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './gravadora-form.component.html',
    styleUrl: './gravadora-form.component.css'
  })

  export class GravadoraFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private gravadoraService: GravadoraService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {
  
      const gravadora: Gravadora = activatedRoute.snapshot.data['gravadora'];
  
      this.formGroup = formBuilder.group({
        id: [(gravadora && gravadora.id) ? gravadora.id : null],
        nome: [(gravadora && gravadora.nome) ? gravadora.nome : '', Validators.required]
      });
  
    }
  
    salvar() {
      if (this.formGroup.valid) {
        const gravadora = this.formGroup.value;
        if (gravadora.id ==null) {
          this.gravadoraService.insert(gravadora).subscribe({
            next: (gravadoraCadastrado) => {
              this.router.navigateByUrl('/gravadoras');
            },
            error: (err) => {
              console.log('Erro ao Salvar' + JSON.stringify(err));
            }
          });
        } else {
          this.gravadoraService.update(gravadora).subscribe({
            next: (gravadoraAlterado) => {
              this.router.navigateByUrl('/gravadoras');
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
        const gravadora = this.formGroup.value;
        if (gravadora.id != null) {
          this.gravadoraService.delete(gravadora).subscribe({
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