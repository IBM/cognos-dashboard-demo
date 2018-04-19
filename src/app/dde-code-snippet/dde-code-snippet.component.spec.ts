import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeCodeSnippetComponent } from './dde-code-snippet.component';

describe('DdeCodeSnippetComponent', () => {
  let component: DdeCodeSnippetComponent;
  let fixture: ComponentFixture<DdeCodeSnippetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeCodeSnippetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeCodeSnippetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  */
});
