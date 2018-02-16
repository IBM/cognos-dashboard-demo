import { TestBed, inject } from '@angular/core/testing';

import { DdeActionService } from './dde-action.service';

describe('DdeActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DdeActionService]
    });
  });

  it('should be created', inject([DdeActionService], (service: DdeActionService) => {
    expect(service).toBeTruthy();
  }));
});
