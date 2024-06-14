import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CdCardListComponent } from '../cd-card-list/cd-card-list/cd-card-list.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatCardModule, MatButtonModule,RouterModule, CdCardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
