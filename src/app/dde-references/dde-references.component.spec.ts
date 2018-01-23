import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeReferencesComponent } from './dde-references.component';

describe('DdeReferencesComponent', () => {
  let component: DdeReferencesComponent;
  let fixture: ComponentFixture<DdeReferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeReferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeReferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
