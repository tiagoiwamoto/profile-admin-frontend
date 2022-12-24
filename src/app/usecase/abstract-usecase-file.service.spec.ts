import {TestBed} from '@angular/core/testing';

import {AbstractUsecaseFile} from './abstract-usecase-file.service';

describe('AbstractUsecaseFileService', () => {
  let service: AbstractUsecaseFile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractUsecaseFile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
