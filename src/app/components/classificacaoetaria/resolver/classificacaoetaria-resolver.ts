import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ClassificacaoEtaria } from "../../../models/classificacaoetaria.model";
import { ClassificacaoEtariaService } from "../../../services/classificacaoetaria.service";
import { inject } from "@angular/core";

export const classificacaoEtariaResolver: ResolveFn<ClassificacaoEtaria> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ClassificacaoEtariaService).findById(route.paramMap.get('id')!);
    }