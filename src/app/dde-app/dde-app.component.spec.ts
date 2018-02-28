import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DDEAppComponent } from './dde-app.component';

describe('DDEAppComponent', () => {
  let component: DDEAppComponent;
  let fixture: ComponentFixture<DDEAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DDEAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DDEAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
