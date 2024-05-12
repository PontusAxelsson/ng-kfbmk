import { TestBed } from '@angular/core/testing';

import { TrainingGroupService } from './training-group.service';

describe('TrainingGroupService', () => {
  let service: TrainingGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
