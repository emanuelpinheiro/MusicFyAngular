import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartaoService } from '../../../services/cartao.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartaoCredito } from '../../../models/cartao.model';

@Component({
    selector: 'app-cartao-form',
    standalone: true,
    imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
      MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
    templateUrl: './cartao-form.component.html',
    styleUrl: './cartao-form.component.css'
  })

  export class CartaoFormComponent {

    formGroup: FormGroup;
  
    constructor(private formBuilder: FormBuilder,
      private cartaoService: CartaoService,
      private router: Router,
        private activatedRoute: ActivatedRoute) {

        const cartao: CartaoCredito = activatedRoute.snapshot.data['cartao'];

        this.formGroup = formBuilder.group({
            id: [(cartao && cartao.id) ? cartao.id : null],
            tipoCartao: [(cartao && cartao.tipoCartao) ? cartao.tipoCartao : '', Validators.required],
            numeroCartao: [(cartao && cartao.numeroCartao) ? cartao.numeroCartao : '', Validators.required],
            nomeImpressoCartao: [(cartao && cartao.nomeImpressoCartao) ? cartao.nomeImpressoCartao : '', Validators.required],
            cpfTitular: [(cartao && cartao.cpfTitular) ? cartao.cpfTitular : '', Validators.required],
            dataValidade: [(cartao && cartao.dataValidade) ? cartao.dataValidade : '', Validators.required],
            codigoSeguranca: [(cartao && cartao.codigoSeguranca) ? cartao.codigoSeguranca : '', Validators.required]
        });

    }
  
    salvar() {
      if (this.formGroup.valid) {
        const cartao = this.formGroup.value;
        if (cartao.id ==null) {
          this.cartaoService.insert(cartao).subscribe({
            next: (cartaoCadastrado) => {
              this.router.navigateByUrl('/cartao');
            },
            error: (err) => {
              console.log('Erro ao Salvar' + JSON.stringify(err));
            }
          });
        } else {
          this.cartaoService.update(cartao).subscribe({
            next: (cartaoAlterado) => {
              this.router.navigateByUrl('/cartao');
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
        const cartao = this.formGroup.value;
        this.cartaoService.delete(cartao.id).subscribe({
          next: (cartaoExcluido) => {
            this.router.navigateByUrl('/cartao');
          },
          error: (err) => {
            console.log('Erro ao Excluir' + JSON.stringify(err));
          }
        });
      }
    }
  }