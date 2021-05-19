import { TestBed } from '@angular/core/testing';

import { HistoryProviderService } from './history-provider.service';

describe('HistoryProviderService', () => {
  let service: HistoryProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
