import { Artista } from "./artista.models";
import { Genero } from "./genero.model";
import { Gravadora } from "./gravadora.model";

export class Album{
    id!: number;
    nome!: string;
    anoLancamento!: string;
    descricao!: string;
    preco!: number;
    tipoProduto!: string;
    estoque!: number;
    artista!: Artista;
    genero!: Genero;
    gravadora!: Gravadora;
    nomeImagem!: string;

}