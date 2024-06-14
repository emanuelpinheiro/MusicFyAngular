import { Cliente } from "./cliente.model";
import { Endereco } from "./endereco.model";
import { ItemCarrinho } from "./itemcarrinho.model";

export interface Pedido {
    id?: number; 
    pagamento?: number;
    endereco?: number;
    itens?: any;
}