import { TestBed, inject } from '@angular/core/testing';

import { ApiBankingOperationsService } from './api-banking-operations.service';

describe('ApiBankingOperationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiBankingOperationsService]
    });
  });

  it('should be created', inject([ApiBankingOperationsService], (service: ApiBankingOperationsService) => {
    expect(service).toBeTruthy();
  }));
});
