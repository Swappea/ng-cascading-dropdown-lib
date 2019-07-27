import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCascadingDropdownLibComponent } from './ng-cascading-dropdown-lib.component';

describe('NgCascadingDropdownLibComponent', () => {
  let component: NgCascadingDropdownLibComponent;
  let fixture: ComponentFixture<NgCascadingDropdownLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCascadingDropdownLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCascadingDropdownLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
