import { Component } from '@angular/core';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-card-payment-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatFormField, MatLabel, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatGridListModule, MatTabsModule, MatOptionModule, MatCardModule],
  templateUrl: './card-payment-dialog.component.html',
  styleUrl: './card-payment-dialog.component.css'
})
export class CardPaymentDialogComponent {
  constructor(public dialogRef: MatDialogRef<CardPaymentDialogComponent>) {}

  cardDetails = {
    numero: '',
    nomeTitular: '',
    dataExpiracao: '',
    cvv: ''
  };

  salvarCartao(): void {
    
    this.dialogRef.close(this.cardDetails);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
