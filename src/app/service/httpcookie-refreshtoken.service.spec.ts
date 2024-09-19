import { TestBed } from '@angular/core/testing';

import { HttpcookieRefreshtokenService } from './httpcookie-refreshtoken.service';

describe('HttpcookieRefreshtokenService', () => {
  let service: HttpcookieRefreshtokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpcookieRefreshtokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
