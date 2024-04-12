import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { generoResolver } from './genero.resolver';

describe('generoResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => generoResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
