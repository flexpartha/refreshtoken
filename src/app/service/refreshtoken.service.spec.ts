import { TestBed } from '@angular/core/testing';

import { RefreshtokenService } from './refreshtoken.service';

describe('RefreshtokenService', () => {
  let service: RefreshtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
