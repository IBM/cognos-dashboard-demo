import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeToasterComponent } from './dde-toaster.component';

describe('DdeToasterComponent', () => {
  let component: DdeToasterComponent;
  let fixture: ComponentFixture<DdeToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeToasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
