import { Component, OnInit } from '@angular/core';
import { UserTemplateComponent } from '../template/user-template/user-template.component';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';
import { PedidosService } from '../../services/pedidos.service';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardTitle } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-minhas-compras',
  standalone: true,
  imports: [UserTemplateComponent,MatCard, MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, NgFor, NgIf, MatButton, CommonModule],
  templateUrl: './minhas-compras.component.html',
  styleUrl: './minhas-compras.component.css'
})
export class MinhasComprasComponent implements OnInit {

  usuarioLogado!: Usuario;
  listCompras: any = [];
  private subscription = new Subscription();

  constructor(private sidebarService: SidebarService,
    private authService: AuthService,
    private pedidoService: PedidosService,
    private router: Router) {

  }

  
  ngOnInit(): void {
    this.obterCompras();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // async obterUsuarioLogado() {
  //   this.subscription.add(this.authService.getUsuarioLogado().subscribe(
  //     usuario => {
  //       if (usuario) {
  //         this.usuarioLogado = usuario;
  //         this.obterComprasUsuario(usuario.id);
  //       }
  //     }
  //   ));
  // }
  

  async obterCompras(){
    this.pedidoService.findAll().subscribe(data => {
      console.log("🚀 ~ MinhasComprasComponent ~ this.pedidoService.findAll ~ data:", data)
      this.listCompras = data;
    })
  }

}
