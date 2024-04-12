import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Album } from "../../../models/album.model";
import { AlbumService } from "../../../services/album.service";
import { inject } from "@angular/core";

export const albumResolver: ResolveFn<Album> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(AlbumService).findById(route.paramMap.get('id')!);
    }