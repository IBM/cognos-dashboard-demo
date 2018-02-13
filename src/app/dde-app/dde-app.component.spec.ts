import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeAppComponent } from './dde-app.component';

describe('DdeAppComponent', () => {
  let component: DdeAppComponent;
  let fixture: ComponentFixture<DdeAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
