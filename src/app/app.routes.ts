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
import { HomeComponent } from './components/home/home.component';
import { GeneroListComponent } from './components/genero/genero-list/genero-list.component';
import { GeneroFormComponent } from './components/genero/genero-form/genero-form.component';
import { generoResolver } from './components/genero/resolver/genero.resolver';
import { FaixaListComponent } from './components/faixa/faixa-list/faixa-list.component';
import { FaixaFormComponent } from './components/faixa/faixa-form/faixa-form.component';
import { faixaResolver } from './components/faixa/resolver/faixa-resolver';
import { CompositorListComponent } from './components/compositor/compositor-list/compositor-list.component';
import { CompositorFormComponent } from './components/compositor/compositor-form/compositor-form.component';
import { compositorResolver } from './components/compositor/resolver/compositor-resolver';
import { ClassificacaoEtariaListComponent } from './components/classificacaoetaria/classificacaoetaria-list/classificacaoetaria-list.component';
import { ClassificacaoEtariaFormComponent } from './components/classificacaoetaria/classificacaoetaria-form/classificacaoetaria-form.component';
import { classificacaoEtariaResolver } from './components/classificacaoetaria/resolver/classificacaoetaria-resolver';
import { EdicaoEspecialListComponent } from './components/edicaoespecial/edicaoespecial-list/edicaoespecial-list.component';
import { EdicaoEspecialFormComponent } from './components/edicaoespecial/edicaoespecial-form/edicaoespecial-form.component';
import { edicaoespecialResolver } from './components/edicaoespecial/resolver/edicaoespecial-resolver';
import { LoginComponent } from './components/login/login.component';
import { UserTemplateComponent } from './components/template/user-template/user-template.component';
import { AdminTemplateComponent } from './components/template/admin-template/admin-template.component';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { ConsultaCardListComponent } from './components/consulta-card-list/consulta-card-list.component';


export const routes: Routes = [  
    
    { 
        path: '', 
        component: UserTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'produtos'},
            //{ path: '', component: HomeComponent, title: 'Home'},

            { path: 'produtos', component: ConsultaCardListComponent, title: 'Produtos à Venda'},
            { path: 'login', component: LoginComponent, title: 'Login'},
            { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de pedidos'},
        ]

    },

    { 
        path: 'admin', 
        component: AdminTemplateComponent, 
        title: 'e-commerce',
        children: [
            {path: '', pathMatch: 'full', redirectTo: 'home'},
            { path: '', component: HomeComponent, title: 'Home'},

            { path: 'gravadoras', component: GravadoraListComponent, title: 'Lista de Gravadoras'},
            { path: 'gravadoras/new', component: GravadoraFormComponent, title: 'Nova Gravadora'},
            { path: 'gravadoras/edit/:id', component: GravadoraFormComponent, resolve: {gravadora: gravadoraResolver}},

            { path: 'artistas', component: ArtistaListComponent, title: 'Lista de Artistas'},
            { path: 'artistas/new', component: ArtistaFormComponent, title: 'Novo Artista'},
            { path: 'artistas/edit/:id', component: ArtistaFormComponent, resolve: {artista: artistaResolver}},

            { path: 'albuns', component: AlbumListComponent, title: 'Lista de Albuns'},
            { path: 'albuns/new', component: AlbumFormComponent, title: 'Nova Album'},
            { path: 'albuns/edit/:id', component: AlbumFormComponent, resolve: {album: albumResolver}},


            { path: 'generos', component: GeneroListComponent, title: 'Lista de Gêneros'},
            { path: 'generos/new', component: GeneroFormComponent, title: 'Novo Gênero'},
            { path: 'generos/edit/:id', component: GeneroFormComponent, resolve: {genero: generoResolver}},

            { path: 'faixas', component: FaixaListComponent, title: 'Lista de Faixas'},
            { path: 'faixas/new', component: FaixaFormComponent, title: 'Nova Faixa'},
            { path: 'faixas/edit/:id', component: FaixaFormComponent, resolve: {faixa: faixaResolver}},

            { path: 'compositores', component: CompositorListComponent, title: 'Lista de Compositores'},
            { path: 'compositores/new', component: CompositorFormComponent, title: 'Novo Compositor'},
            { path: 'compositores/edit/:id', component: CompositorFormComponent, resolve: {compositor: compositorResolver}},

            { path: 'classificacaoetaria', component: ClassificacaoEtariaListComponent, title: 'Lista de Classificação Etária'},
            { path: 'classificacaoetaria/new', component: ClassificacaoEtariaFormComponent, title: 'Nova Classificação Etária'},
            { path: 'classificacaoetaria/edit/:id', component: ClassificacaoEtariaFormComponent, resolve: {classificacaoEtaria: classificacaoEtariaResolver}},

            { path: 'edicaoespecial', component: EdicaoEspecialListComponent, title: 'Lista de Edição Especial'},
            { path: 'edicaoespecial/new', component: EdicaoEspecialFormComponent, title: 'Nova Edição Especial'},
            { path: 'edicaoespecial/edit/:id', component: EdicaoEspecialFormComponent, resolve: {edicaoEspecial: edicaoespecialResolver}},



        
        ]

    },



            
            { path: 'gravadoras', component: GravadoraListComponent, title: 'Lista de Gravadoras'},
            { path: 'gravadoras/new', component: GravadoraFormComponent, title: 'Nova Gravadora'},
            { path: 'gravadoras/edit/:id', component: GravadoraFormComponent, resolve: {gravadora: gravadoraResolver}},

            { path: 'artistas', component: ArtistaListComponent, title: 'Lista de Artistas'},
            { path: 'artistas/new', component: ArtistaFormComponent, title: 'Novo Artista'},
            { path: 'artistas/edit/:id', component: ArtistaFormComponent, resolve: {artista: artistaResolver}},

            { path: 'albuns', component: AlbumListComponent, title: 'Lista de Albuns'},
            { path: 'albuns/new', component: AlbumFormComponent, title: 'Nova Album'},
            { path: 'albuns/edit/:id', component: AlbumFormComponent, resolve: {album: albumResolver}},


            { path: 'generos', component: GeneroListComponent, title: 'Lista de Gêneros'},
            { path: 'generos/new', component: GeneroFormComponent, title: 'Novo Gênero'},
            { path: 'generos/edit/:id', component: GeneroFormComponent, resolve: {genero: generoResolver}},

            { path: 'faixas', component: FaixaListComponent, title: 'Lista de Faixas'},
            { path: 'faixas/new', component: FaixaFormComponent, title: 'Nova Faixa'},
            { path: 'faixas/edit/:id', component: FaixaFormComponent, resolve: {faixa: faixaResolver}},

            { path: 'compositores', component: CompositorListComponent, title: 'Lista de Compositores'},
            { path: 'compositores/new', component: CompositorFormComponent, title: 'Novo Compositor'},
            { path: 'compositores/edit/:id', component: CompositorFormComponent, resolve: {compositor: compositorResolver}},

            { path: 'classificacaoetaria', component: ClassificacaoEtariaListComponent, title: 'Lista de Classificação Etária'},
            { path: 'classificacaoetaria/new', component: ClassificacaoEtariaFormComponent, title: 'Nova Classificação Etária'},
            { path: 'classificacaoetaria/edit/:id', component: ClassificacaoEtariaFormComponent, resolve: {classificacaoEtaria: classificacaoEtariaResolver}},

            { path: 'edicaoespecial', component: EdicaoEspecialListComponent, title: 'Lista de Edição Especial'},
            { path: 'edicaoespecial/new', component: EdicaoEspecialFormComponent, title: 'Nova Edição Especial'},
            { path: 'edicaoespecial/edit/:id', component: EdicaoEspecialFormComponent, resolve: {edicaoEspecial: edicaoespecialResolver}},


    // { 
    //     path: 'admin', 
    //     component: AdminTemplateComponent, 
    //     title: 'e-commerce',
    //     children: [
    //         {path: '', pathMatch: 'full', redirectTo: 'Home'},

    //         //{ path: '', component: HomeComponent, title: 'Home'},
    //         { path: 'gravadoras', component: GravadoraListComponent, title: 'Lista de Gravadoras'},
    //         { path: 'gravadoras/new', component: GravadoraFormComponent, title: 'Nova Gravadora'},
    //         { path: 'gravadoras/edit/:id', component: GravadoraFormComponent, resolve: {gravadora: gravadoraResolver}},

    //         { path: 'artistas', component: ArtistaListComponent, title: 'Lista de Artistas'},
    //         { path: 'artistas/new', component: ArtistaFormComponent, title: 'Novo Artista'},
    //         { path: 'artistas/edit/:id', component: ArtistaFormComponent, resolve: {artista: artistaResolver}},

    //         { path: 'albuns', component: AlbumListComponent, title: 'Lista de Albuns'},
    //         { path: 'albuns/new', component: AlbumFormComponent, title: 'Nova Album'},
    //         { path: 'albuns/edit/:id', component: AlbumFormComponent, resolve: {album: albumResolver}},


    //         { path: 'generos', component: GeneroListComponent, title: 'Lista de Gêneros'},
    //         { path: 'generos/new', component: GeneroFormComponent, title: 'Novo Gênero'},
    //         { path: 'generos/edit/:id', component: GeneroFormComponent, resolve: {genero: generoResolver}},

    //         { path: 'faixas', component: FaixaListComponent, title: 'Lista de Faixas'},
    //         { path: 'faixas/new', component: FaixaFormComponent, title: 'Nova Faixa'},
    //         { path: 'faixas/edit/:id', component: FaixaFormComponent, resolve: {faixa: faixaResolver}},

    //         { path: 'compositores', component: CompositorListComponent, title: 'Lista de Compositores'},
    //         { path: 'compositores/new', component: CompositorFormComponent, title: 'Novo Compositor'},
    //         { path: 'compositores/edit/:id', component: CompositorFormComponent, resolve: {compositor: compositorResolver}},

    //         { path: 'classificacaoetaria', component: ClassificacaoEtariaListComponent, title: 'Lista de Classificação Etária'},
    //         { path: 'classificacaoetaria/new', component: ClassificacaoEtariaFormComponent, title: 'Nova Classificação Etária'},
    //         { path: 'classificacaoetaria/edit/:id', component: ClassificacaoEtariaFormComponent, resolve: {classificacaoEtaria: classificacaoEtariaResolver}},

    //         { path: 'edicaoespecial', component: EdicaoEspecialListComponent, title: 'Lista de Edição Especial'},
    //         { path: 'edicaoespecial/new', component: EdicaoEspecialFormComponent, title: 'Nova Edição Especial'},
    //         { path: 'edicaoespecial/edit/:id', component: EdicaoEspecialFormComponent, resolve: {edicaoEspecial: edicaoespecialResolver}},

        
    //     ]

    // },

];
