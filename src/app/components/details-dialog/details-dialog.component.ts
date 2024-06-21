import { Component, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogContent, MatDialogActions, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Artista } from '../../models/artista.models';
import { Faixa } from '../../models/faixa.model';
import { Genero } from '../../models/genero.model';
import { Gravadora } from '../../models/gravadora.model';
import { NgFor, NgIf } from '@angular/common';

type Card = {
  idAlbum: number;
  nome: string;
  anoLancamento: string;
  artista: Artista;
  estoque: number;
  faixas: any;
  genero: Genero;
  gravadora: Gravadora;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-details-dialog',
  standalone: true,
  imports: [NgFor,NgIf,MatDialogContent, MatDialogActions, MatFormField, MatLabel, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule, MatOptionModule, MatCardModule],
  templateUrl: './details-dialog.component.html',
  styleUrl: './details-dialog.component.css'
})
export class DetailsDialogComponent {
  card: Card;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DetailsDialogComponent>) {
    this.card = data; // Recebe o objeto card dos dados do diálogo
    console.log("🚀 ~ DetailsDialogComponent ~ constructor ~ this.card:", this.card)
  }


  closeDialog(): void {
    this.dialogRef.close();
  }
}
