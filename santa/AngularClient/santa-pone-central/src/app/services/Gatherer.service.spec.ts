import { TestBed } from '@angular/core/testing';

import { GathererService } from './gatherer.service';

describe('GathererService', () => {
  let service: GathererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GathererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
