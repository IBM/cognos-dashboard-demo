import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeDashboardComponent } from './dde-dashboard.component';

describe('DdeDashboardComponent', () => {
  let component: DdeDashboardComponent;
  let fixture: ComponentFixture<DdeDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  */
});
