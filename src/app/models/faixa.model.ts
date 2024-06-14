import { Album } from "./album.model";
import { Compositor } from "./compositor.model";

export class Faixa{
    id!: number;
    nome!: string;
    id_album!: number;
    nome_album!: string;
    compositor!: Compositor;
}