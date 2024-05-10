import { HttpInterceptorFn } from '@angular/common/http';

export const testeInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
