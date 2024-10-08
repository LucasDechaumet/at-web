import { TestBed } from '@angular/core/testing';

import { ParamInventaireAlgoService } from './param-inventaire-algo.service';

describe('ParamInventaireAlgoService', () => {
  let service: ParamInventaireAlgoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParamInventaireAlgoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
