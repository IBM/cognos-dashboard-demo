import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeDialogComponent } from './dde-dialog.component';

describe('DdeDialogComponent', () => {
  let component: DdeDialogComponent;
  let fixture: ComponentFixture<DdeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
