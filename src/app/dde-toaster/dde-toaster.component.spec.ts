import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { DdeToasterComponent } from './dde-toaster.component';

describe('DdeToasterComponent', () => {
  let component: DdeToasterComponent;
  let fixture: ComponentFixture<DdeToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularSvgIconModule,

      ],
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
