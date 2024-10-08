import { TestBed } from '@angular/core/testing';

import { CodePinService } from './code-pin.service';

describe('CodePinService', () => {
  let service: CodePinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodePinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
