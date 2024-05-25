import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Cd } from '../../../models/cd.model';
import { CdService } from '../../../services/cd.service';

@Component({
  selector: 'app-cd-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule],
  templateUrl: './cd-form.component.html',
  styleUrl: './cd-form.component.css'
})
export class CdFormComponent {
  formGroup: FormGroup;
  apiResponse: any = null;
  
  fileName: string = '';
  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private formBuilder: FormBuilder,
    private cdService: CdService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {

  const cd: Cd = activatedRoute.snapshot.data['cd'];

    this.formGroup = formBuilder.group({
    id: [(cd && cd.id) ? cd.id : null],
    nome: [(cd && cd.nome) ? cd.nome : '', 
      Validators.compose([Validators.required])],
    preco:[(cd && cd.preco) ? cd.preco : '', Validators.required]
    });

}
    voltarPagina() {
      this.location.back();
    }
    
    salvar() {
      if (this.formGroup.valid) {
        const cd = this.formGroup.value;
        if (cd.id == null) {
          this.cdService.save(cd).subscribe({
            next: (cdCadastrada) => {
              this.uploadImage(cdCadastrada.id);
            },
            error: (errorResponse) => {
               // Processar erros da API
              this.apiResponse = errorResponse.error; 
  
              // Associar erros aos campos do formulário
              this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
              this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });
        
              console.log('Erro ao incluir' + JSON.stringify(errorResponse));
            }
          });
        } else {
          this.cdService.update(cd).subscribe({
            next: (cdAtualizada) => {
              this.uploadImage(cdAtualizada.id);
            },
            error: (err) => {
              console.log('Erro ao alterar' + JSON.stringify(err));
            }
          });        
        }
      }
    }

    getErrorMessage(fieldName: string): string {
      const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
      return error ? error.message : '';
    }
  
    excluir() {
      const cd = this.formGroup.value;
      if (cd.id != null) {
        this.cdService.delete(cd).subscribe({
          next: (e) => {
            this.router.navigateByUrl('/cds/list');
          },
          error: (err) => {
            console.log('Erro ao excluir' + JSON.stringify(err));
          }
        });
      }      
    }
  
    carregarImagemSelecionada(event: any) {
      this.selectedFile = event.target.files[0];
  
      if (this.selectedFile) {
        this.fileName = this.selectedFile.name;
        // carregando image preview
        const reader = new FileReader();
        reader.onload = e => this.imagePreview = reader.result;
        reader.readAsDataURL(this.selectedFile);
      }
  
    }
  
    private uploadImage(cdId: number) {
      if (this.selectedFile) {
        this.cdService.uploadImagem(cdId, this.selectedFile.name, this.selectedFile)
        .subscribe({
          next: () => {
            this.voltarPagina();
          },
          error: err => {
            console.log('Erro ao fazer o upload da imagem');
            // tratar o erro
          }
        })
      } else {
        this.voltarPagina();
      }
    }



}
