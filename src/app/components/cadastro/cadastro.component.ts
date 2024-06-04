import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { CepService } from '../../services/cep.service';
import { CidadeService } from '../../services/cidade.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    RouterModule,
    MatSelectModule,
    FormsModule,
    MatGridListModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cepService: CepService,
    private cidadeService: CidadeService,
    private snackBar: MatSnackBar
  ) {
    const cliente: Cliente = activatedRoute.snapshot.data['cadastro'];

    this.formGroup = this.formBuilder.group({
      id: [cliente && cliente.id ? cliente.id : null],
      nome: [cliente && cliente.nome ? cliente.nome : '', Validators.required],
      cpf: [cliente && cliente.cpf ? cliente.cpf : '', Validators.required],
      dataNascimento: [cliente && cliente.dataNascimento ? cliente.dataNascimento : '', Validators.required],
      username: [cliente && cliente.nomeUsuario ? cliente.nomeUsuario : '', Validators.required],
      senha: [cliente && cliente.senha ? cliente.senha : '', Validators.required],
      logradouro: [cliente && cliente.endereco.logradouro ? cliente.endereco.logradouro : '', Validators.required],
      bairro: [cliente && cliente.endereco.bairro ? cliente.endereco.bairro : '', Validators.required],
      numero: [cliente && cliente.endereco.numero ? cliente.endereco.numero : '', Validators.required],
      complemento: [cliente && cliente.endereco.complemento ? cliente.endereco.complemento : ''],
      cep: [cliente && cliente.endereco.cep ? cliente.endereco.cep : '', Validators.required],
      cidade: [ '', Validators.required],
      idNaturalidade: [''],
      estado: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    console.log("aa")
  }

  salvar() {
    if (this.formGroup.valid) {
      const cliente : Cliente = this.formGroup.value;
        console.log("🚀 ~ CadastroComponent ~ salvar ~ cliente:", cliente)
        this.clienteService.insert(cliente).subscribe({
          next: (clienteCadastrado) => {
            console.log("🚀 ~ CadastroComponent ~ this.clienteService.insert ~ clienteCadastrado:", clienteCadastrado)
            this.router.navigateByUrl('/login');
          },
          error: (err) => {
            this.showSnackbarTopPosition(err.error.errors[0].message, 'Fechar', 3500);
            console.log('Erro ao Incluir' + JSON.stringify(err));
          }
        });
      } 
    }

  getIdCidade(cidade: any) {
    this.cidadeService.findByName(cidade).subscribe((data: any) => {
      this.formGroup.patchValue({
        idNaturalidade: data[0].estado.id
      });
    }, error => {
      console.error('Erro ao buscar cidade', error);
    });
  }

  excluir() {

  }

  onBlurCep() {
    const cep = this.formGroup.get('cep')?.value;
    if (cep) {
      this.cepService.buscarCep(cep).subscribe(data => {
        console.log("🚀 ~ CadastroComponent ~ this.cepService.buscarCep ~ data:", data)
        this.formGroup.patchValue({
          logradouro: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        });
        this.getIdCidade(data.localidade);
      }, error => {
        console.error('Erro ao buscar CEP', error);
      });
    }
  }

  showSnackbarTopPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
}
