import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeDashboardBarComponent } from './dde-dashboard-bar.component';

describe('DdeDashboardBarComponent', () => {
  let component: DdeDashboardBarComponent;
  let fixture: ComponentFixture<DdeDashboardBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeDashboardBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDashboardBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
