import { ResolveFn } from '@angular/router';

export const cdResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
