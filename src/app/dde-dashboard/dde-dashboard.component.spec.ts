import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeDashbaordComponent } from './dde-dashbaord.component';

describe('DdeDashbaordComponent', () => {
  let component: DdeDashbaordComponent;
  let fixture: ComponentFixture<DdeDashbaordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeDashbaordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDashbaordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
