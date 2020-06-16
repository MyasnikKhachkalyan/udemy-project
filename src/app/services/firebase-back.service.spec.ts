import { TestBed } from '@angular/core/testing';

import { FirebaseBackService } from './firebase-back.service';

describe('FirebaseBackService', () => {
  let service: FirebaseBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
