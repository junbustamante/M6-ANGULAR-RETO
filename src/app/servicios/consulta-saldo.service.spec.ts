import { TestBed } from '@angular/core/testing';

import { ConsultaSaldoService } from './consulta-saldo.service';

describe('ConsultaSaldoService', () => {
  let service: ConsultaSaldoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaSaldoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
