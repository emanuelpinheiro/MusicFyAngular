import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Compositor } from "../../../models/compositor.model";
import { CompositorService } from "../../../services/compositor.service";
import { inject } from "@angular/core";

export const compositorResolver: ResolveFn<Compositor> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(CompositorService).findById(route.paramMap.get('id')!);
    }