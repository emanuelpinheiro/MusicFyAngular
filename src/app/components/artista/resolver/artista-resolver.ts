import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
//import { Artista } from "../../../models/artista.model";
import { ArtistaService } from "../../../services/artista.service";
import { inject } from "@angular/core";
import { Artista } from "../../../models/artista.models";

export const artistaResolver: ResolveFn<Artista> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(ArtistaService).findById(route.paramMap.get('id')!);
    }