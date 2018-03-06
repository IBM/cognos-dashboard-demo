import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeCodeExplorerComponent } from './dde-code-explorer.component';

describe('DdeCodeExplorerComponent', () => {
  let component: DdeCodeExplorerComponent;
  let fixture: ComponentFixture<DdeCodeExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeCodeExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeCodeExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  */
});
