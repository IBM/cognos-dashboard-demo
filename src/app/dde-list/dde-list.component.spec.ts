import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DdeListComponent } from './dde-list.component';

describe('DdeListComponent', () => {
  let component: DdeListComponent;
  let fixture: ComponentFixture<DdeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DdeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DdeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
