import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { CartaoCredito } from "../../../models/cartao.model";
import { CartaoService } from "../../../services/cartao.service";
import { inject } from "@angular/core";

export const cartaoResolver: ResolveFn<CartaoCredito> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CartaoService).findById(route.paramMap.get('id')!);
    }