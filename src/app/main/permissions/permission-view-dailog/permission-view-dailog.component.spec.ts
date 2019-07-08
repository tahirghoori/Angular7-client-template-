import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionViewDailogComponent } from './permission-view-dailog.component';

describe('PermissionViewDailogComponent', () => {
  let component: PermissionViewDailogComponent;
  let fixture: ComponentFixture<PermissionViewDailogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionViewDailogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionViewDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
