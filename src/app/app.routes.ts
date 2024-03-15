import { Routes } from '@angular/router';
import { gravadoraResolver } from './components/gravadora/resolver/gravadora-resolver';
import { GravadoraListComponent } from './components/gravadora/gravadora-list/gravadora-list.component';
import { GravadoraFormComponent } from './components/gravadora/gravadora-form/gravadora-form.component';
import { artistaResolver } from './components/artista/resolver/artista-resolver';
import { ArtistaListComponent } from './components/artista/artista-list/artista-list.component';
import { ArtistaFormComponent } from './components/artista/artista-form/artista-form.component';
import { albumResolver } from './components/album/resolver/album-resolver';
import { AlbumFormComponent } from './components/album/album-form/album-form.component';
import { AlbumListComponent } from './components/album/album-list/album-list.component';

export const routes: Routes = [    


{ path: 'gravadoras', component: GravadoraListComponent, title: 'Lista de Gravadoras'},
{ path: 'gravadoras/new', component: GravadoraFormComponent, title: 'Nova Gravadora'},
{ path: 'gravadoras/edit/:id', component: GravadoraFormComponent, resolve: {gravadora: gravadoraResolver}},

{ path: 'artistas', component: ArtistaListComponent, title: 'Lista de Artistas'},
{ path: 'artistas/new', component: ArtistaFormComponent, title: 'Novo Artista'},
{ path: 'artistas/edit/:id', component: ArtistaFormComponent, resolve: {artista: artistaResolver}},

{ path: 'albuns', component: AlbumListComponent, title: 'Lista de Albuns'},
{ path: 'albuns/new', component: AlbumFormComponent, title: 'Nova Album'},
{ path: 'albuns/edit/:id', component: AlbumFormComponent, resolve: {album: albumResolver}},


];
