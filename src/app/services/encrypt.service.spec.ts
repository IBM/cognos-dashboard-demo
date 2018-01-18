import { TestBed, inject } from '@angular/core/testing';

import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptService]
    });
  });

  it('should be created', inject([EncryptService], (service: EncryptService) => {
    expect(service).toBeTruthy();
  }));
});
