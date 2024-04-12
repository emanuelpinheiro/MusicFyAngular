import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Gravadora } from "../../../models/gravadora.model";
import { GravadoraService } from "../../../services/gravadora.service";
import { inject } from "@angular/core";

export const gravadoraResolver: ResolveFn<Gravadora> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(GravadoraService).findById(route.paramMap.get('id')!);
    }