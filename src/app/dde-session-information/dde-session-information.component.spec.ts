import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeSessionInformationComponent } from './dde-session-information.component';

describe('DdeSessionInformationComponent', () => {
  let component: DdeSessionInformationComponent;
  let fixture: ComponentFixture<DdeSessionInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeSessionInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeSessionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
