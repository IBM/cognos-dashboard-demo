import { TestBed, inject } from '@angular/core/testing';

import { DdeApiService } from './dde-api.service';

describe('DdeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DdeApiService]
    });
  });

  it('should be created', inject([DdeApiService], (service: DdeApiService) => {
    expect(service).toBeTruthy();
  }));
});
