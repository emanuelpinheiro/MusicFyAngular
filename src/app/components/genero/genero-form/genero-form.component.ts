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
import { Genero } from '../../../models/genero.model';
import { GeneroService } from '../../../services/genero.service';

@Component({
  selector: 'app-genero-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './genero-form.component.html',
  styleUrl: './genero-form.component.css'
})
export class GeneroFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private generoService: GeneroService,
      private router: Router,
      private activatedRoute: ActivatedRoute) {

        const genero: Genero = activatedRoute.snapshot.data['genero'];
  
        this.formGroup = this.formBuilder.group({
          id: [(genero && genero.id) ? genero.id : null],
          nome: [(genero && genero.nome) ? genero.nome : '', Validators.required]
        });


      }

      
    salvar() {
      if (this.formGroup.valid) {
        const genero = this.formGroup.value;
        if (genero.id ==null) {
          this.generoService.insert(genero).subscribe({
            next: (generoCadastrado) => {
              this.router.navigateByUrl('/generos');
            },
            error: (err: any) => {
              console.log('Erro ao Incluir' + JSON.stringify(err));
            }
          });
        } else {
          this.generoService.update(genero).subscribe({
            next: (gravadoraAlterado) => {
              this.router.navigateByUrl('/generos');
            },
            error: (err: any) => {
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
          this.generoService.delete(gravadora).subscribe({
            next: () => {
              this.router.navigateByUrl('/generos');
            },
            error: (err:any) => {
              console.log('Erro ao Excluir' + JSON.stringify(err));
            }
          });
        }
      }
    }
}
