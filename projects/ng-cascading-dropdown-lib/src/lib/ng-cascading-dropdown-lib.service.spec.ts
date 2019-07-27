import { TestBed } from '@angular/core/testing';

import { NgCascadingDropdownLibService } from './ng-cascading-dropdown-lib.service';

describe('NgCascadingDropdownLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgCascadingDropdownLibService = TestBed.get(NgCascadingDropdownLibService);
    expect(service).toBeTruthy();
  });
});
