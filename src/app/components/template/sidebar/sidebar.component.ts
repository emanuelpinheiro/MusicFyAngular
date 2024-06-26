import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../../../services/sidebar.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatList, MatListItem, MatNavList } from '@angular/material/list';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf,MatSidenav, MatDrawer, MatDrawerContainer, RouterModule,
           MatDrawerContent, MatToolbar, MatList, MatNavList, MatListItem, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() tipo: number | undefined;
 
  @ViewChild('drawer') public drawer!: MatDrawer;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.sideNavToggleSubject.subscribe(
      () => {
        this.drawer.toggle();
      }
    )

    console.log("🚀 ~ SidebarComponent ~ tipo:", this.tipo)
  }
}