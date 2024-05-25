import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cdResolver } from './cd.resolver';

describe('cdResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cdResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
