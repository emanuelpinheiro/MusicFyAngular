import { Endereco } from "./endereco.model";

export class Cliente{
    id!: number;
    nome!: string;
    cpf!: string;
    dataNascimento!: string;
    nomeUsuario!: string;
    senha!: string;
    endereco!: Endereco;
}