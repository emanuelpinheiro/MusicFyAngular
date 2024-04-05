// import { Component, OnInit } from '@angular/core';
// import { CartaoCredito } from '../../../models/cartao.model';
// import { CartaoService } from '../../../services/cartao.service';
// import { NgFor } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-cartao-list',
//   standalone: true,
//   imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
//   templateUrl: './cartao-list.component.html',
//   styleUrls: ['./cartao-list.component.css']
// })

// export class CartaoListComponent implements OnInit {

//   cartoes: CartaoCredito[] = [];

//   constructor(private cartaoService: CartaoService) { }

//   ngOnInit(): void {
//     this.cartaoService.findAll().subscribe({
//       next: (cartoes) => {
//         this.cartoes = cartoes;
//       },
//       error: (err) => {
//         console.log('Erro ao listar cartões' + JSON.stringify(err));
//       }
//     });
//   }

//   salvar() {
//     if (this.formGroup.valid) {
//       const cartao = this.formGroup.value;
//       if (cartao.id == null) {
//         this.cartaoService.insert(cartao).subscribe({
//           next: (cartaoCadastrado) => {
//             this.router.navigateByUrl('/cartao');
//           },
//           error: (err) => {
//             console.log('Erro ao Salvar' + JSON.stringify(err));
//           }
//         });
//       } else {
//         this.cartaoService.update(cartao).subscribe({
//           next: (cartaoAlterado) => {
//             this.router.navigateByUrl('/cartao');
//           },
//           error: (err) => {
//             console.log('Erro ao Salvar' + JSON.stringify(err));
//           }
//         });
//       }
//     }
//   }

//   excluir(cartao: CartaoCredito) {
//     this.cartaoService.delete(cartao).subscribe({
//       next: () => {
//         this.cartoes = this.cartoes.filter(c => c.id !== cartao.id);
//       },
//       error: (err) => {
//         console.log('Erro ao excluir cartão' + JSON.stringify(err));
//       }
//     });
//   }

// }