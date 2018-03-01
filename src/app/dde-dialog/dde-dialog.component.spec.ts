import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { DdeDialogComponent } from './dde-dialog.component';

describe('DdeDialogComponent', () => {
  let component: DdeDialogComponent;
  let fixture: ComponentFixture<DdeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        HttpClientModule,
        ModalModule.forRoot(),
        AngularSvgIconModule,
      ],
      declarations: [ DdeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


    it('should create', () => {
      expect(component).toBeTruthy();
    });

});
