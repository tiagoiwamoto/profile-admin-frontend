import {TestBed} from '@angular/core/testing';

import {AbstractUsecase} from './abstract-usecase.service';

describe('AbstractUsecaseService', () => {
  let service: AbstractUsecase;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractUsecase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
