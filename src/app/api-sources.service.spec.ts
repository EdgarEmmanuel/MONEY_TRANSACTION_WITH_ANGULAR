import { TestBed } from '@angular/core/testing';

import { ApiSourcesService } from './api-sources.service';

describe('ApiSourcesService', () => {
  let service: ApiSourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
