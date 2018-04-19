import { TestBed, inject } from '@angular/core/testing';

import { DdeApiService } from './dde-api.service';
import { HttpModule } from '@angular/http';
import { EncryptService } from './encrypt.service';

describe('DdeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        DdeApiService,
        EncryptService
    ]
    });
  });

  it('should be created', inject([DdeApiService], (service: DdeApiService) => {
    expect(service).toBeTruthy();
  }));
});
