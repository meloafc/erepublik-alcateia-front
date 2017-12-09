import { TestBed, inject } from '@angular/core/testing';

import { ErepublikService } from './erepublik.service';

describe('ErepublikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErepublikService]
    });
  });

  it('should be created', inject([ErepublikService], (service: ErepublikService) => {
    expect(service).toBeTruthy();
  }));
});
