import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { EdicaoEspecial } from "../../../models/edicaoespecial.model";
import { EdicaoEspecialService } from "../../../services/edicaoespecial.service";
import { inject } from "@angular/core";

export const edicaoespecialResolver: ResolveFn<EdicaoEspecial> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(EdicaoEspecialService).findById(route.paramMap.get('id')!);
    }