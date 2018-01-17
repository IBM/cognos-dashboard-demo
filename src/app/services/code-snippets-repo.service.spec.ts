import { TestBed, inject } from '@angular/core/testing';

import { CodeSnippetsRepoService } from './code-snippets-repo.service';

describe('CodeSnippetsRepoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeSnippetsRepoService]
    });
  });

  it('should be created', inject([CodeSnippetsRepoService], (service: CodeSnippetsRepoService) => {
    expect(service).toBeTruthy();
  }));
});
