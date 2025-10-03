import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { catDogGuard } from './cat-dog.guard';

describe('catDogGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => catDogGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
