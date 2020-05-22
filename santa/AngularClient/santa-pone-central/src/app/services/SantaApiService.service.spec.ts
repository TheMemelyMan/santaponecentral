import { TestBed, async, inject } from '@angular/core/testing';
import { SantaApiGetService } from './santaApiService.service';

describe('Service: SantaApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SantaApiGetService]
    });
  });

  it('should ...', inject([SantaApiGetService], (service: SantaApiGetService) => {
    expect(service).toBeTruthy();
  }));
});
