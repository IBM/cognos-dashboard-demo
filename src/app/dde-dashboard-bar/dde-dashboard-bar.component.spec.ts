import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DdeDashboardBarComponent } from './dde-dashboard-bar.component';

describe('DdeDashboardBarComponent', () => {
  let component: DdeDashboardBarComponent;
  let fixture: ComponentFixture<DdeDashboardBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularSvgIconModule,
      ],
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
