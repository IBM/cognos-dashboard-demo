import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeSessionComponent } from './dde-session.component';

describe('DdeSessionComponent', () => {
  let component: DdeSessionComponent;
  let fixture: ComponentFixture<DdeSessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeSessionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
